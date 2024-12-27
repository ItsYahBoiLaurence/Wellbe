import { Auth } from 'aws-amplify';
import {
  ConfirmSignupRequest,
  ConfirmSignupResponse,
  Employee,
  LoginRequest,
  SignupRequest,
  SignupResponse,
} from '../../types';
import callApi from '../callApi';
import { UseQueryOptions } from '@tanstack/react-query';

export const QUERY_AUTH_KEYS = {
  currentUser: () => ['current-user'],
};

const getCurrentLoggedInEmployee = (): Promise<Employee> => {
  return callApi<Employee>('/auth/employee/me', {
    method: 'GET',
  });
};

export const signup = (data: SignupRequest): Promise<SignupResponse> => {
  return callApi<SignupResponse>('/auth/employee/signup', {
    method: 'POST',
    data,
  });
};

export const login = async (data: LoginRequest): Promise<Employee> => {
  const userRes = await Auth.signIn(data.email, data.password);
  if (!userRes) throw new Error('Invalid email/password');

  const loggedInEmployee = await getCurrentLoggedInEmployee();
  if (!loggedInEmployee) throw new Error('Invalid email/password');

  return loggedInEmployee;
};

export const confirmSignup = (
  data: ConfirmSignupRequest
): Promise<ConfirmSignupResponse> => {
  return callApi<ConfirmSignupResponse>('/auth/employee/confirm-signup', {
    method: 'POST',
    data,
  });
};

export const getLoggedInUserQuery = (): UseQueryOptions<
  Employee,
  Error,
  Employee
> => ({
  queryKey: QUERY_AUTH_KEYS.currentUser(),
  queryFn: getCurrentLoggedInEmployee,
  enabled: !!Auth.currentAuthenticatedUser(),
  retry: false,
  staleTime: 10,
});
