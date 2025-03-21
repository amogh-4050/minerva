/*
  # Create resources table and security policies

  1. New Tables
    - `resources`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on resources table
    - Add policies for:
      - Authenticated users can read resources
      - Only admins can create/update/delete resources
*/

CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow authenticated users to view resources"
  ON resources
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to manage resources"
  ON resources
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');