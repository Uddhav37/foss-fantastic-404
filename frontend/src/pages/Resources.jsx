import { useState } from 'react';
import { Box, Heading, Link, VStack, Text, Flex, Button, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const Resources = () => {
  // Sample resource data with existing average ratings
  const allResources = [
    { id: 1, name: 'B.Sc. Nursing', courseCode: 'NURS101', university: 'ABC University', url: 'https://example.com/docs', rating: 4.2, totalRatings: 10 },
    { id: 2, name: 'B. Ed.', courseCode: 'EDU102', university: 'XYZ University', url: 'https://example.com/docs', rating: 3.8, totalRatings: 7 },
    { id: 3, name: 'Community Forums', courseCode: 'GENFORUM', university: 'Open Community', url: 'https://example.com/forums', rating: 4.5, totalRatings: 15 },
    { id: 4, name: 'M.Sc. Nursing', courseCode: 'NURS202', university: 'ABC University', url: 'https://example.com/docs2', rating: 4.0, totalRatings: 8 },
    { id: 5, name: 'PhD in Education', courseCode: 'EDU303', university: 'XYZ University', url: 'https://example.com/docs3', rating: 3.5, totalRatings: 5 }
  ];

  // State to track selected university
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  
  // State to track user ratings (before submitting)
  const [userRatings, setUserRatings] = useState({});

  // Filter resources based on selected university
  const filteredResources = selectedUniversity
    ? allResources.filter(resource => resource.university === selectedUniversity)
    : allResources;

  // Handle rating click (before submission)
  const handleRatingClick = (resourceId, rating) => {
    setUserRatings(prev => ({ ...prev, [resourceId]: rating }));
  };

  // Simulate rating submission (in a real app, this would send to an API)
  const handleSubmitRating = (resource) => {
    const userRating = userRatings[resource.id] || 0;
    if (userRating > 0) {
      alert(`Rating submitted: ${userRating} stars for ${resource.name}`);
      // In a real app, this is where you'd send data to a backend
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="lg" textAlign="center">
        {selectedUniversity ? `${selectedUniversity} Resources` : "All Resources"}
      </Heading>

      {/* Show "Back to All" Button if a university is selected */}
      {selectedUniversity && (
        <Button colorScheme="blue" size="sm" onClick={() => setSelectedUniversity(null)}>
          Show All Resources
        </Button>
      )}

      {/* Table Header */}
      <Box p={3} fontWeight="bold" bg="gray.100" borderRadius="md">
        <Flex justify="space-between">
          <Text flex="2" textAlign="center">Course Name</Text>
          <Text flex="1" textAlign="center">Course Code</Text>
          <Text flex="1" textAlign="center">University</Text>
          <Text flex="1.5" textAlign="center">Avg. Rating</Text>
          <Text flex="2" textAlign="center">Your Rating</Text>
        </Flex>
      </Box>

      {/* Table Content */}
      {filteredResources.map((resource) => (
        <Box key={resource.id} p={3} borderWidth="1px" borderRadius="md">
          <Flex justify="space-between" align="center">
            {/* Course Name */}
            <Text flex="2" textAlign="center" whiteSpace="nowrap" overflowWrap="break-word">
              <Link href={resource.url} color="teal.500" isExternal fontWeight="bold">
                {resource.name}
              </Link>
            </Text>

            {/* Course Code */}
            <Text flex="1" textAlign="center" color="gray.600" whiteSpace="nowrap">
              {resource.courseCode}
            </Text>

            {/* University Name */}
            <Text flex="1" textAlign="center" color="blue.500" cursor="pointer" whiteSpace="nowrap"
              onClick={() => setSelectedUniversity(resource.university)}>
              {resource.university}
            </Text>

            {/* Average Rating (Stars) */}
            <Flex flex="1.5" justify="center">
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  as={FaStar}
                  key={star}
                  boxSize={4}
                  mx={0.5}
                  color={star <= Math.round(resource.rating) ? "yellow.400" : "gray.300"}
                />
              ))}
              <Text ml={2} fontSize="sm" color="gray.600">({resource.totalRatings})</Text>
            </Flex>

            {/* User Rating (Clickable Stars) */}
            <Flex flex="2" justify="center">
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  as={FaStar}
                  key={star}
                  boxSize={5}
                  mx={0.5}
                  cursor="pointer"
                  color={star <= (userRatings[resource.id] || 0) ? "yellow.400" : "gray.300"}
                  onClick={() => handleRatingClick(resource.id, star)}
                />
              ))}
              <Button ml={3} size="xs" colorScheme="green" onClick={() => handleSubmitRating(resource)}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default Resources;
