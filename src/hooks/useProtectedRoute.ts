import { useRootNavigation, useRouter, useSegments } from 'expo-router';
import { User } from 'firebase/auth';
import { useEffect } from 'react';

export const useProtectedRoute = (user: User | null) => {
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();
  useEffect(() => {
    if (!rootNavigation?.isReady()) return;
    const inAuthGroup = segments[0] === '(auth)' || segments[0] === '(aux)';
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('(auth)/signIn');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('(app)/(main)/(tabs)/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments]);
};
