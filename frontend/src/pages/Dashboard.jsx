// src/pages/Dashboard.jsx
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const Dashboard = () => {
  // Sample user data; replace with actual data as needed
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="lg">Dashboard</Heading>
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Text fontSize="lg">Welcome, {user.name}!</Text>
        <Text>Email: {user.email}</Text>
        {/* Add more user-specific information and features here */}
      </Box>
    </VStack>
  );
};

export default Dashboard;
