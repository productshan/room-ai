export interface UploadResponse {
  path: string;
  url: string;
}

export async function uploadImage(file: File) {
  const body = new FormData();
  body.append('image', file);

  const response = await fetch('/api/uploads', {
    method: 'POST',
    body
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Upload failed');
  }

  return data as UploadResponse;
}
