export type SignupResponse = {
  success: boolean;
};

export type SignupRequest = {
  email: string;
  password: string;
  companyId: string;
};

export type LoginRequest = {
  email: string;
  password: string;
  companyId: string;
};

export type ConfirmSignupRequest = {
  email: string;
  code: string;
};

export type ConfirmSignupResponse = {
  success: boolean;
};
