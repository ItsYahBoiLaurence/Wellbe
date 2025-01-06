import { useRoutes } from 'react-router-dom';
import { DashboardLayout } from './components/Layouts';
import GetStartedPage from './pages/GetStarted';
import HomePage from './pages/Home';
import InboxPage from './pages/Inbox';
import MyWellBePage from './pages/MyWellBe';
import OtpPage from './pages/Otp';
import ProfilePage from './pages/Profile';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SurveyPage from './pages/Survey';
import ForgotPassword from './pages/ForgotPassword';
import SurveyComplete from './pages/Survey/Completed';

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/my-wellbe', element: <MyWellBePage /> },
        { path: '/inbox', element: <InboxPage /> },
        { path: '/profile', element: <ProfilePage /> },
      ],
    },
    {
      path: '/survey',
      element: <SurveyPage />,
    },
    {
      path: '/survey-complete',
      element: <SurveyComplete />,
    },
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/otp',
      element: <OtpPage />,
    },
    {
      path: '/get-started',
      element: <GetStartedPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
  ]);
};

export default Routes;
