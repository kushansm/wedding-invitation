"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LocationDetails {
    placeName: string;
    address: string;
    latitude: number;
    longitude: number;
    placeId: string; 
}

interface LocationPickerProps {
    value?: LocationDetails;
    onChange: (location: LocationDetails) => void;
}

// Fix Leaflet marker icon issue in Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface NominatimResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
    name: string;
}

// Helper component to change map center when location changes
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
    const [query, setQuery] = useState(value?.placeName || "");
    const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Default to Colombo, Sri Lanka
    const defaultPosition: [number, number] = [6.9271, 79.8612];
    const currentPosition: [number, number] = value ? [value.latitude, value.longitude] : defaultPosition;
    const zoomLevel = value ? 15 : 8;

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (val.length < 3) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            setIsSearching(true);
            try {
                // Nominatim has a strict 1 request/sec limit, so debounce is necessary
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=5`);
                const data: NominatimResult[] = await response.json();
                setSuggestions(data);
                setShowDropdown(true);
            } catch (error) {
                console.error("Nominatim search error:", error);
            } finally {
                setIsSearching(false);
            }
        }, 800); 
    };

    const handleSelectSuggestion = (suggestion: NominatimResult) => {
        const placeName = suggestion.name || suggestion.display_name.split(',')[0];
        setQuery(placeName);
        setShowDropdown(false);
        setSuggestions([]);

        onChange({
            placeName: placeName,
            address: suggestion.display_name,
            latitude: parseFloat(suggestion.lat),
            longitude: parseFloat(suggestion.lon),
            placeId: suggestion.place_id.toString(),
        });
    };

    const openInGoogleMaps = () => {
        if (value?.latitude && value?.longitude) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${value.latitude},${value.longitude}`, "_blank");
        }
    };

    return (
        <div className="space-y-4 relative z-50">
            <div className="relative z-[60]">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
                    onBlur={() => { 
                        // Delay hiding dropdown so click event on suggestion can fire
                        setTimeout(() => setShowDropdown(false), 200); 
                    }}
                    placeholder="Search for a venue (e.g. Hotel, Hall, Temple)"
                    className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm relative z-[60]"
                />
                {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 z-[61]">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                
                {/* Autocomplete Dropdown */}
                {showDropdown && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden z-[100]">
                        {suggestions.map((s) => (
                            <div 
                                key={s.place_id}
                                onClick={() => handleSelectSuggestion(s)}
                                className="p-3 hover:bg-primary/5 cursor-pointer border-b border-black/5 last:border-0"
                            >
                                <p className="text-sm font-medium text-foreground">{s.name || s.display_name.split(',')[0]}</p>
                                <p className="text-xs text-foreground/50 truncate">{s.display_name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full h-[200px] rounded-xl border border-black/5 bg-gray-50 overflow-hidden relative z-0">
                <MapContainer center={currentPosition} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                    <ChangeView center={currentPosition} zoom={zoomLevel} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {value && <Marker position={currentPosition} icon={customIcon} />}
                </MapContainer>
            </div>

            {value && (
                <div className="flex items-center justify-between bg-primary/5 p-3 rounded-xl border border-primary/10">
                    <div className="overflow-hidden mr-2">
                        <p className="text-sm font-medium truncate text-foreground">{value.placeName}</p>
                        <p className="text-xs text-foreground/60 truncate">{value.address}</p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            openInGoogleMaps();
                        }}
                        className="shrink-0 bg-primary text-background text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Open in Maps
                    </button>
                </div>
            )}
        </div>
    );
}
