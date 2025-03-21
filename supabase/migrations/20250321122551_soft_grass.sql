/*
  # Allow public access to resources

  1. Changes
    - Add policy for public access to resources table

  2. Security
    - Allow anonymous users to read resources
    - Maintain existing policies for authenticated users
*/

-- Add policy for public access to resources
CREATE POLICY "Allow public to view resources"
ON resources
FOR SELECT
TO anon
USING (true);