import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../src/theme';
import queryClient from './queryClient';
import Routes from './Routes';
import { AuthProvider } from './contexts/Auth';
import { ProfileProvider } from './contexts/Profile';

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme} stylesTransform={emotionTransform}>
        <MantineEmotionProvider>
          <QueryClientProvider client={queryClient}>
            {/* <AuthProvider> */}
            <ProfileProvider>
              <Routes />
            </ProfileProvider>
            {/* </AuthProvider> */}
          </QueryClientProvider>
        </MantineEmotionProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
