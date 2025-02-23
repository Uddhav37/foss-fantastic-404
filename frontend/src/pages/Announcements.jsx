
import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import './CalendarStyles.css';

const Announcements = () => {
  const announcements = [
    { id: 1, title: '🔔 Submission Deadline Extended', content: 'Last date extended for B. Ed. & B.Sc. Nursing Entrance Test.', date: new Date(2025, 2, 10) },
    { id: 2, title: '📢 Exam Date Change Notice', content: 'The exam date for B. Ed. & B.Sc. Nursing has been revised.', date: new Date(2025, 2, 15) },
    { id: 3, title: '🎓 New Scholarship Program Announced', content: 'Apply before the deadline to avail the new scholarship program.', date: new Date(2025, 2, 20) },
  ];

  const [date, setDate] = useState(new Date());

  const eventDates = announcements.map(event => event.date.toDateString());

  // Function to determine event class
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && eventDates.includes(date.toDateString())) {
      return 'event-day';
    }
    return null;
  };

  // Function to get event details for the selected date
  const selectedEvent = announcements.find(event => event.date.toDateString() === date.toDateString());

  return (
    <Flex justify="space-between" align="start" p={5} wrap="wrap">
      {/* Announcements Section */}
      <VStack spacing={6} align="stretch" flex="2" maxW="65%">
        <Heading as="h2" size="lg" textAlign="center" mb={4} color="blue.700">
          📢 Announcements
        </Heading>

        {announcements.map((announcement) => (
          <Box
            key={announcement.id}
            p={5}
            borderRadius="lg"
            bg="rgba(255, 255, 255, 0.8)"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
              bg: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <Heading as="h3" size="md" mb={2} color="blue.800">
              {announcement.title}
            </Heading>
            <Text color="gray.700">{announcement.content}</Text>
          </Box>
        ))}
      </VStack>

      {/* Calendar Section */}
      <Box
        flex="1"
        maxW="30%"
        p={5}
        borderRadius="lg"
        bg="rgba(255, 255, 255, 0.8)"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "translateY(-3px)", boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)" }}
      >
        <Heading as="h3" size="md" mb={4} textAlign="center" color="blue.700">
          📅 Calendar
        </Heading>
        <div className="custom-calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName} // Adding event highlighting
            className="custom-calendar"
          />
        </div>
        <Text 
            mt={3} 
            textAlign="center" 
            fontSize="lg" 
            fontWeight="bold" 
            color="blue.800"
            bg="blue.100"
            p={2}
            borderRadius="md"
            boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
          >
            📅 Selected Date: {date.toDateString()}
          </Text>


        {/* Display Event Details Below Selected Date */}
        {selectedEvent && (
          <Box mt={3} p={3} bg="blue.50" borderRadius="md" boxShadow="0px 3px 8px rgba(0, 0, 0, 0.1)">
            <Heading as="h4" size="sm" color="blue.800">{selectedEvent.title}</Heading>
            <Text mt={1} fontSize="sm" color="gray.700">{selectedEvent.content}</Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Announcements;
