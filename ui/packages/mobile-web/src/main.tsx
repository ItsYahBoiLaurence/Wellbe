import { Amplify, Auth } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { APP_CONFIG } from './utils/constants.ts';

const awsConfig = {
  Auth: {
    identityPoolId: APP_CONFIG.COGNITO_IDENTITY_POOL_ID,
    userPoolId: APP_CONFIG.COGNITO_USERPOOL_ID,
    userPoolWebClientId: APP_CONFIG.COGNITO_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    region: APP_CONFIG.COGNITO_REGION,
  },
};

Amplify.configure(awsConfig);
Auth.configure(awsConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
