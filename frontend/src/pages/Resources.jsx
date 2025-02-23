// src/pages/Resources.jsx
import { Box, Heading, Link, VStack } from '@chakra-ui/react';

const Resources = () => {
  const resources = [
    { id: 1, name: 'B.Sc. Nursing', url: 'https://example.com/docs' },
    { id: 2, name: 'B. Ed.', url: 'https://example.com/docs' },
    { id: 3, name: 'Community Forums', url: 'https://example.com/forums' },
  ];

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="lg">Resources</Heading>
      {resources.map((resource) => (
        <Box key={resource.id} p={4} borderWidth="1px" borderRadius="lg">
          <Link href={resource.url} color="teal.500" isExternal>
            {resource.name}
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

export default Resources;
