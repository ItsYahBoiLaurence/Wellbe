export type ApiResponseError = {
  type: string;
  message: string;
  response?: {
    errors: string[];
  }[];
};

export type ApiResponse<T> = {
  data: T;
  error?: ApiResponseError;
};

export type PatchMutation<T> = {
  id?: string;
  payload: Partial<T>;
};

export type EmblaCarousel = {
  scrollNext: () => void;
  scrollPrev: () => void;
};
