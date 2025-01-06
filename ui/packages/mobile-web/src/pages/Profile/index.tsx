import { Container, Avatar, Button, Paper, Text } from '@mantine/core';

const ProfilePage = () => {
  return (
    <Container >
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        Cici
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        jfingerlicker@me.io • Art director
      </Text>
    </Container>
  );
};

export default ProfilePage;


