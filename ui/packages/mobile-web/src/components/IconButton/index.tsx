import { ActionIcon, ActionIconProps, ElementProps } from '@mantine/core';

type Props = ActionIconProps & ElementProps<'button', keyof ActionIconProps>;

export const DefaultIconButton = (props: Props) => (
  <ActionIcon
    {...props}
    variant="transparent"
    style={(t) => ({
      color: t.colors.gray[9],
    })}
  />
);

export const PrimaryIconButton = (props: Props) => (
  <ActionIcon {...props} variant="primary" style={{ borderRadius: '100%' }} />
);

export const SubtleIconButton = (props: Props) => (
  <ActionIcon {...props} variant="subtle" style={{ borderRadius: '100%' }} />
);

export const FilledIconButton = (props: Props) => (
  <ActionIcon {...props} variant="filled" style={{ borderRadius: '100%' }} />
);

export const LightIconButton = (props: Props) => (
  <ActionIcon {...props} variant="light" style={{ borderRadius: '100%' }} />
);
