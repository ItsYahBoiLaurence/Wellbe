import { useContext } from 'react';
import { AuthContext, AuthContextProviderProps } from '../contexts/Auth';

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextProviderProps;
};
