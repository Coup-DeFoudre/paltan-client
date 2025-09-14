import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to Sanity Studio
  redirect('/admin/studio');
}

export const metadata = {
  title: 'Admin - The Paltan',
  description: 'Admin panel for The Paltan',
};