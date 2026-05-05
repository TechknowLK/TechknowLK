import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedUrls = [];

    // The destination directory
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'Img', 'ProjectImages');

    // Ensure the directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    for (const file of files) {
      if (!file || typeof file === 'string') continue;
      
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Sanitize filename to avoid weird characters
      const originalName = file.name || 'unknown';
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const uniqueName = `${Date.now()}-${sanitizedName}`;
      
      const filePath = path.join(uploadDir, uniqueName);
      await fs.writeFile(filePath, buffer);
      
      // Store the relative path format expected by the frontend
      uploadedUrls.push(`/assets/Img/ProjectImages/${uniqueName}`);
    }

    return NextResponse.json({ success: true, urls: uploadedUrls }, { status: 200 });
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
