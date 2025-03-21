/*
  # Add file storage support to resources

  1. Changes
    - Add file_name and file_size columns to resources table
    - Add file_type column for MIME type
    - Update RLS policies to allow file uploads for admins
*/

-- Add new columns for file information
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS file_name text,
ADD COLUMN IF NOT EXISTS file_size bigint,
ADD COLUMN IF NOT EXISTS file_type text;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', false)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket policy for authenticated users to read
CREATE POLICY "Authenticated users can read resources"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resources');

-- Storage bucket policy for admins to upload
CREATE POLICY "Admins can upload resources"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resources' AND
  (auth.jwt() ->> 'role')::text = 'admin'
);

-- Storage bucket policy for admins to delete
CREATE POLICY "Admins can delete resources"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'resources' AND
  (auth.jwt() ->> 'role')::text = 'admin'
);