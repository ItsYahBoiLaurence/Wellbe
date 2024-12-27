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
      path: '/survey/:id',
      element: <SurveyPage />,
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
  ]);
};

export default Routes;
