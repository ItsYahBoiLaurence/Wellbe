import { Box, BoxComponentProps } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { DefaultIconButton } from '../IconButton';

export type PageHeaderProps = BoxComponentProps & {
  hasLogo?: boolean;
  hasUserMenu?: boolean;
  actionButton?: React.ReactNode;
  previousPage?: string;
};

export const PageHeader = ({
  hasLogo,
  hasUserMenu,
  previousPage,
  actionButton,
  style,
  ...props
}: PageHeaderProps) => {
  return (
    <Box
      {...props}
      display="flex"
      style={{
        ...style,
        height: 48,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        position: 'relative',
      }}
    >
      {actionButton ? (
        actionButton
      ) : (
        <>
          {previousPage ? (
            <Box component={Link} to={previousPage}>
              <DefaultIconButton>
                <IconChevronLeft />
              </DefaultIconButton>
            </Box>
          ) : (
            <Box style={{ width: 48 }} />
          )}
        </>
      )}
      {hasLogo && (
        <Box>
          <img src={Logo} alt="Logo" />
        </Box>
      )}
      {hasUserMenu && (
        <Box
          component="img"
          src="https://i.pravatar.cc/300"
          alt="User Menu"
          style={{ borderRadius: '100%', width: 36, height: 36 }}
        />
      )}
    </Box>
  );
};
