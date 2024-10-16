'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authApi from '@/lib/api/authApi';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await authApi.logout();
        router.push('/user/login');
      } catch (error) {
        console.error('Error during logout:', error);
        router.push('/user/login');
      }
    };

    performLogout();
  }, [router]);

  return <div>Logging out...</div>;
}