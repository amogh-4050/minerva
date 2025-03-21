/*
  # Fix profiles table policies to prevent recursion

  1. Changes
    - Drop existing policies that cause recursion
    - Create new, simplified policies for profiles table

  2. Security
    - Maintain RLS for profiles table
    - Allow users to read their own profile
    - Allow admins to read all profiles using a direct role check
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Admin users can read all profiles" ON profiles;

-- Create new policies without recursion
CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Admin policy using metadata from JWT
CREATE POLICY "Admins can read all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role')::text = 'admin'
);