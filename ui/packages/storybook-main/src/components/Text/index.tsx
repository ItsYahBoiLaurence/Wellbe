import {
  Title,
  Text,
  TitleProps,
  TextProps as DefaultTextProps,
} from '@mantine/core';

export type TextProps = React.PropsWithChildren<DefaultTextProps>;

export function Title1(props: TitleProps) {
  return <Title order={1} {...props} />;
}

export function Title2(props: TitleProps) {
  return <Title order={2} {...props} />;
}

export function Title3(props: TitleProps) {
  return <Title order={3} {...props} />;
}

export function Title4(props: TitleProps) {
  return <Title order={4} {...props} />;
}

export function Title5(props: TitleProps) {
  return <Title order={5} {...props} />;
}

export function Title6(props: TitleProps) {
  return <Title order={6} {...props} />;
}

export function Large(props: TextProps) {
  return <Text size="lg" {...props} />;
}

export function Body(props: TextProps) {
  return <Text size="md" {...props} />;
}

export function Small(props: TextProps) {
  return <Text size="sm" {...props} />;
}

export function Bold(props: TextProps) {
  return <Text fw={700} {...props} />;
}

export function Italic(props: TextProps) {
  return <Text fs="italic" {...props} />;
}

export function Dimmed(props: TextProps) {
  return <Text c="dimmed" {...props} />;
}
