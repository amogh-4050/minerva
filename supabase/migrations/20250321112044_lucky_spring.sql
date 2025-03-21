/*
  # Create initial admin user

  1. Changes
    - Create admin user in auth.users
    - Set up admin role in profiles table
*/

-- Create admin user if it doesn't exist
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Insert admin user into auth.users if not exists
  INSERT INTO auth.users (
    email,
    raw_user_meta_data,
    is_super_admin,
    encrypted_password
  )
  VALUES (
    'admin@example.com',
    '{"role":"admin"}',
    true,
    crypt('admin123', gen_salt('bf'))
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO admin_id;

  -- Insert admin profile if user was created
  IF admin_id IS NOT NULL THEN
    INSERT INTO profiles (id, role)
    VALUES (admin_id, 'admin')
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;