import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // file upload needs Node.js runtime

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Send to your backend (NestJS) API
  console.log('Uploading image to backend:', file.name, file.size, file.type);
  const backendRes = await fetch(`http://localhost:8080/api/blogs/upload-image`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data', // Don't set, let fetch handle it
      'Authorization': `Bearer ${process.env.BACKEND_TOKEN || ''}`,
    },
    body: (() => {
      const fd = new FormData();
      fd.append('image', new Blob([buffer]), file.name);
      return fd;
    })(),
  });
  console.log('Backend upload response status:', backendRes.status);

  const data = await backendRes.json();
  console.log('Backend upload response data:', data);

  if (!backendRes.ok) {
    return NextResponse.json({ success: false, error: data.error || 'Upload failed' }, { status: 500 });
  }

  // EditorJS expects { success: 1, file: { url: '...' } }
  return NextResponse.json({
    success: 1,
    file: { url: data.url || data.image || data.file || '' },
  });
}