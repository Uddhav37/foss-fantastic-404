// src/pages/Announcements.jsx
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const Announcements = () => {
  const announcements = [
    { id: 1, title: 'Extension of last date for Submission of Online Application Form for Entrance Test of B. Ed. & B.Sc. Nursing (For January 2025 Session)', content: 'Please find enclosed a notification regarding extension of last date for Submission of Online Application Form for Entrance Test of B. Ed. & B.Sc. Nursing (For January 2025 Session).' },
    { id: 2, title: 'Extension of last date for Submission of Online Application Form for Entrance Test of B. Ed. & B.Sc. Nursing (For January 2025 Session)', content: 'Please find enclosed a notification regarding extension of last date for Submission of Online Application Form for Entrance Test of B. Ed. & B.Sc. Nursing (For January 2025 Session).' },
    { id: 3, title: 'Extension of last date for Submission of Online Application Form for Entrance Test of B. Ed. & B.Sc. Nursing (For January 2025 Session)', content: 'Please find enclosed a notification regarding extension of last date for Submission of Online Application Form for Entrance Test of B. Ed. & B.Sc. Nursing (For January 2025 Session).' },
  ];

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="lg">Announcements</Heading>
      {announcements.map((announcement) => (
        <Box key={announcement.id} p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h3" size="md">{announcement.title}</Heading>
          <Text mt={2}>{announcement.content}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default Announcements;
