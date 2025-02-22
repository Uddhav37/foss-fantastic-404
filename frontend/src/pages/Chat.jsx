import { Box, Button, VStack, HStack, Text, Avatar, Input, IconButton, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { BsSend, BsEmojiSmile } from 'react-icons/bs';

const Chat = () => {
  const users = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];
  const [activeChat, setActiveChat] = useState(users[0]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), { text: input, sender: 'you' }],
      }));
      setInput('');
    }
  };

  const handleEmojiClick = () => {
    setInput(input + "😊");
  };

  return (
    <HStack spacing={0} align="stretch" h="100vh" bg="gray.100">
      {/* Sidebar */}
      <VStack w="300px" p={4} bg="gray.200" align="stretch" spacing={3}>
        {users.map((user) => (
          <HStack
            key={user}
            p={3}
            borderRadius="md"
            bg={activeChat === user ? "teal.300" : "white"}
            cursor="pointer"
            onClick={() => setActiveChat(user)}
          >
            <Avatar size="sm" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{user}</Text>
              <Text fontSize="sm" color="gray.500">Last message...</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      {/* Chat Area */}
      <VStack flex={1} p={4} spacing={4} align="stretch" h="100vh">
        <Text fontSize="lg" fontWeight="bold" p={3} bg="gray.300" borderRadius="lg">Chat with {activeChat}</Text>
        <Box flex={1} p={4} bg="white" borderRadius="lg" display="flex" flexDirection="column" justifyContent="flex-end">
          {(messages[activeChat] || []).map((msg, index) => (
            <HStack key={index} justify={msg.sender === 'you' ? 'flex-end' : 'flex-start'}>
              <Text
                bg={msg.sender === 'you' ? 'teal.100' : 'gray.200'}
                p={3}
                borderRadius="md"
                maxW="70%"
              >
                {msg.text}
              </Text>
            </HStack>
          ))}
        </Box>

        {/* Input Area */}
        <HStack p={3} bg="white" borderRadius="lg" boxShadow="sm" w="full">
          <IconButton icon={<Icon as={BsEmojiSmile} />} variant="ghost" onClick={handleEmojiClick} />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            size="lg"
            border="none"
            flex={1}
          />
          <IconButton icon={<Icon as={BsSend} />} colorScheme="teal" onClick={handleSend} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Chat;

