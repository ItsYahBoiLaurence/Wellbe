import { Stack } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Auth } from 'aws-amplify';
import { createContext, PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUserQuery, QUERY_AUTH_KEYS } from '../api/services/auth';
import { Employee } from '../types';

export type AuthContextProviderProps = {
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  currentUser/*:Employee*/;
};

export const AuthContext = createContext<AuthContextProviderProps | null>(null);

const EXCLUDED_PATHS = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/otp',
  'forget-password',
];

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: currentUser, isFetched } = useQuery({
    ...getLoggedInUserQuery(),
  });

  const signOut = async () => {
    await Auth.signOut();
    queryClient.invalidateQueries({ queryKey: QUERY_AUTH_KEYS.currentUser() });
  };

  useEffect(() => {
    if (
      isFetched &&
      !currentUser &&
      !EXCLUDED_PATHS.includes(location.pathname)
    ) {
      navigate('/sign-in');
    }
  }, [isFetched, currentUser, location.pathname, navigate]);

  useEffect(() => {
    if (currentUser && EXCLUDED_PATHS.includes(location.pathname)) {
      navigate('/');
    }
  }, [currentUser, location.pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: /*!!currentUser*/false,
        currentUser: /*currentUser as Employee*/ null,
        signOut,
      }}
    >
      <Stack
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        {children}
      </Stack>
    </AuthContext.Provider>
  );
};
