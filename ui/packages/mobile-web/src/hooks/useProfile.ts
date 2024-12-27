import { useContext } from 'react';
import { ProfileContext, ProfileContextProps } from '../contexts/Profile';

export const useProfile = () => {
  return useContext(ProfileContext) as ProfileContextProps;
};
