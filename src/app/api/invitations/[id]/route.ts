import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'invitations.json');

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        
        let db: Record<string, any> = {};
        try {
            const fileContent = await fs.readFile(DB_PATH, 'utf-8');
            db = JSON.parse(fileContent);
        } catch (e) {
            return NextResponse.json({ success: false, error: 'Database not found' }, { status: 404 });
        }

        const invitation = db[id];
        
        if (!invitation) {
            return NextResponse.json({ success: false, error: 'Invitation not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: invitation });
    } catch (error) {
        console.error('Error retrieving invitation:', error);
        return NextResponse.json({ success: false, error: 'Failed to retrieve invitation' }, { status: 500 });
    }
}
