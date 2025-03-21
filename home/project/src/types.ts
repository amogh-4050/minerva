export interface User {
  id: string;
  email: string;
  role: 'admin' | 'participant';
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
}