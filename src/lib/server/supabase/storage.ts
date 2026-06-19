export const SUPABASE_BUCKET = "room-ai";
export const SUPABASE_BUCKET_PATHS = {
  originals: "originals/",
  generated: "generated/"
};

export const formatStoragePath = (folder: keyof typeof SUPABASE_BUCKET_PATHS, filename: string) =>
  `${SUPABASE_BUCKET_PATHS[folder]}${filename}`;
