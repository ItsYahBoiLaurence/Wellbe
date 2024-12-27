import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren } from 'react';
import { getLatestSurveyQuery } from '../api/services/survey';
import { Survey } from '../types/survey';

export type ProfileContextProps = {
  latestSurvey?: Survey;
};

export const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const { data: latestSurvey } = useQuery(getLatestSurveyQuery());

  return (
    <ProfileContext.Provider
      value={{
        latestSurvey,
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
    </ProfileContext.Provider>
  );
};
