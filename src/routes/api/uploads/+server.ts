import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase/admin';
import { SUPABASE_BUCKET, formatStoragePath } from '$lib/server/supabase/storage';

export async function POST({ request }) {
  const formData = await request.formData();
  const imageFile = formData.get('image');

  if (!imageFile || !(imageFile instanceof File)) {
    return json({ error: 'Missing or invalid image file.' }, { status: 400 });
  }

  const filename = `${typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : Date.now()}-${String(
    imageFile.name
  ).replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const path = formatStoragePath('originals', filename);

  const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
    .from(SUPABASE_BUCKET)
    .upload(path, imageFile, { upsert: false });

  if (uploadError || !uploadData) {
    return json({ error: uploadError?.message || 'Unable to upload image.' }, { status: 500 });
  }

  const { data: urlData, error: urlError } = await supabaseAdmin.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(path);

  if (urlError || !urlData) {
    return json({ error: urlError?.message || 'Unable to generate image URL.' }, { status: 500 });
  }

  return json({ path: uploadData.path, url: urlData.publicUrl });
}
