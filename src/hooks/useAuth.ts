import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/api/auth/queries';
import { useAuthStore } from '../store/authStore';
import type { Profile } from '../lib/api/auth/types';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const profile = await getCurrentUser();
        if (isMounted) setUser(profile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        if (isMounted) navigate('/login');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUser();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [navigate, setUser]);

  return { user, loading, isAuthenticated: !!user };
}
