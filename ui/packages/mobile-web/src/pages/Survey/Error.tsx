// import { Box, Container, Image, Text, Title } from '@mantine/core';
// import { IconHome } from '@tabler/icons-react';
// import { Link } from 'react-router-dom';
// import SurverCompletedImage from '../../assets/survey-completed-illustration.png';
// import { PrimaryButton } from '../../components/Buttons/Buttons';
// import { Survey } from '../../types';

// type Props = {
//   survey: Survey;
// };

// const getTitleByStatus = (status: Survey['status']) => {
//   switch (status) {
//     case 'cancelled':
//       return 'Survey Cancelled';
//     case 'expired':
//       return 'Survey Expired';
//     default:
//       return 'Something went wrong!';
//   }
// };

// const getMessageByStatus = (status: Survey['status']) => {
//   switch (status) {
//     case 'cancelled':
//       return 'The survey was cancelled by your organization.';
//     case 'expired':
//       return 'The survey has expired. Please contact your organization for more information.';
//     default:
//       return 'Please try again later.';
//   }
// };

// const SurveyError = ({ survey }: Props) => (
//   <Container
//     style={{
//       paddingTop: 60,
//       display: 'flex',
//       flexDirection: 'column',
//       paddingBottom: 80,
//       height: '100vh',
//     }}
//   >
//     <Box flex={1}>
//       <Image src={SurverCompletedImage} height={229} />
//       <Title order={2} style={{ marginTop: 14, textAlign: 'center' }}>
//         {getTitleByStatus(survey.status)}
//       </Title>
//       <Text style={{ marginTop: 27, maxWidth: 255, textAlign: 'center' }}>
//         {getMessageByStatus(survey.status)}
//       </Text>
//     </Box>
//     <Link to="/">
//       <PrimaryButton leftSection={<IconHome />} style={{ width: '100%' }}>
//         Back to home
//       </PrimaryButton>
//     </Link>
//   </Container>
// );

// export default SurveyError;



