import { Button, ButtonProps, ElementProps } from '@mantine/core';

type Props = ButtonProps & ElementProps<'button', keyof ButtonProps>;

export const PrimaryButton = (props: Props) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton = (props: Props) => (
  <Button {...props} variant="secondary" />
);

export const TextButton = (props: Props) => (
  <Button {...props} variant="text" />
);

export const OutlineButton = (props: Props) => (
  <Button {...props} variant="outline" />
);
