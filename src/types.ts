export interface User {
  isAdmin: any;
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
}