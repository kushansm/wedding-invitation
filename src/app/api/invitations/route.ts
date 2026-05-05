import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'invitations.json');

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const id = Math.random().toString(36).substring(2, 10);
        
        let db: Record<string, any> = {};
        try {
            const fileContent = await fs.readFile(DB_PATH, 'utf-8');
            db = JSON.parse(fileContent);
        } catch (e) {
            // File doesn't exist or is invalid, start fresh
        }

        db[id] = {
            ...data,
            createdAt: new Date().toISOString()
        };

        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error saving invitation:', error);
        return NextResponse.json({ success: false, error: 'Failed to save invitation' }, { status: 500 });
    }
}
