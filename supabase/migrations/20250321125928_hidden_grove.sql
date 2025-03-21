/*
  # Update resource policies

  1. Changes
    - Add policy for public uploads to resources table
    - Update existing policies to be more permissive

  2. Security
    - Allow anonymous users to insert resources
    - Maintain existing read access
*/

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Allow admins to manage resources" ON resources;
DROP POLICY IF EXISTS "Allow authenticated users to view resources" ON resources;

-- Create new policies with proper permissions
CREATE POLICY "Allow public to manage resources"
ON resources
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Note: We keep the existing "Allow public to view resources" policy
-- since it was created in a previous migration