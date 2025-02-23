// import { useState, useEffect } from "react";
// import { Box, Button, VStack, HStack, Text, Avatar, Input, IconButton, Icon } from "@chakra-ui/react";
// import { BsSend, BsEmojiSmile } from "react-icons/bs";
// import { useSocket } from "../store/socketContextProvider";
// import { useAuth } from "../store/authContextProvider"; // Ensure authenticated user is available

// const ChatApp = ({ users = [] }) => {
//   console.log("Users in ChatApp:", users);
//   const { authUser } = useAuth(); // Get the logged-in user
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [input, setInput] = useState("");
//   const socket = useSocket();

//   useEffect(() => {
//     if (!socket) return;

//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => ({
//         ...prev,
//         [message.sender]: [...(prev[message.sender] || []), message],
//       }));
//     });

//     return () => socket.off("receiveMessage");
//   }, [socket]);

//   const handleSend = () => {
//     if (input.trim() && activeChat && authUser) {
//       const newMessage = { text: input, sender: authUser.username, receiver: activeChat.username };
//       setMessages((prev) => ({
//         ...prev,
//         [activeChat.username]: [...(prev[activeChat.username] || []), newMessage],
//       }));
//       socket.emit("sendMessage", newMessage);
//       setInput("");
//     }
//   };

//   const handleEmojiClick = () => {
//     setInput((prev) => prev + "😊");
//   };

//   return (
//     <HStack spacing={0} align="stretch" h="100vh" bg="gray.100">
//       {/* Sidebar */}
//       <VStack w="300px" p={4} bg="gray.200" align="stretch" spacing={3}>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <HStack
//               key={user._id}
//               p={3}
//               borderRadius="md"
//               bg={activeChat?.username === user.username ? "teal.300" : "white"}
//               cursor="pointer"
//               onClick={() => setActiveChat(user)}
//             >
//               <Avatar size="sm" />
//               <VStack align="start" spacing={0}>
//                 <Text fontWeight="bold">{user.username}</Text>
//                 <Text fontSize="sm" color="gray.500">
//                   {messages[user.username]?.slice(-1)[0]?.text || "Last message..."}
//                 </Text>
//               </VStack>
//             </HStack>
//           ))
//         ) : (
//           <Text p={4} fontSize="lg">
//             No users available
//           </Text>
//         )}
//       </VStack>

//       {/* Chat Area */}
//       <VStack flex={1} p={4} spacing={4} align="stretch" h="100vh">
//         {activeChat ? (
//           <>
//             <Text fontSize="lg" fontWeight="bold" p={3} bg="gray.300" borderRadius="lg">
//               Chat with {activeChat.username}
//             </Text>
//             <Box flex={1} p={4} bg="white" borderRadius="lg" display="flex" flexDirection="column" justifyContent="flex-end">
//               {(messages[activeChat?.username] || []).map((msg, index) => (
//                 <HStack key={index} justify={msg.sender === authUser.username ? "flex-end" : "flex-start"}>
//                   <Text bg={msg.sender === authUser.username ? "teal.100" : "gray.200"} p={3} borderRadius="md" maxW="70%">
//                     {msg.text}
//                   </Text>
//                 </HStack>
//               ))}
//             </Box>

//             {/* Input Area */}
//             <HStack p={3} bg="white" borderRadius="lg" boxShadow="sm" w="full">
//               <IconButton icon={<Icon as={BsEmojiSmile} />} variant="ghost" onClick={handleEmojiClick} />
//               <Input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message..."
//                 size="lg"
//                 border="none"
//                 flex={1}
//               />
//               <IconButton icon={<Icon as={BsSend} />} colorScheme="teal" onClick={handleSend} />
//             </HStack>
//           </>
//         ) : (
//           <Text p={4} fontSize="lg" fontWeight="bold">
//             Select a user to start chatting
//           </Text>
//         )}
//       </VStack>
//     </HStack>
//   );
// };

// export default ChatApp;

import { useState, useEffect } from "react";
import { 
  Box, Button, VStack, HStack, Text, Avatar, Input, IconButton, Icon, Badge 
} from "@chakra-ui/react";
import { BsSend, BsEmojiSmile } from "react-icons/bs";
import { useSocket } from "../store/socketContextProvider";
import { useAuth } from "../store/authContextProvider"; // Ensure authenticated user is available

const ChatApp = ({ users = [] }) => {
  console.log("Users in ChatApp:", users);
  const { authUser } = useAuth(); // Get the logged-in user
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => ({
        ...prev,
        [message.sender]: [...(prev[message.sender] || []), message],
      }));
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  const handleSend = () => {
    if (input.trim() && activeChat && authUser) {
      const newMessage = { text: input, sender: authUser.username, receiver: activeChat.username };
      setMessages((prev) => ({
        ...prev,
        [activeChat.username]: [...(prev[activeChat.username] || []), newMessage],
      }));
      socket.emit("sendMessage", newMessage);
      setInput("");
    }
  };

  const handleEmojiClick = () => {
    setInput((prev) => prev + "😊");
  };

  return (
    <HStack spacing={0} align="stretch" h="100vh" bg="gray.100">
      {/* Sidebar */}
      <VStack w="300px" p={4} bg="gray.200" align="stretch" spacing={3}>
        {users.length > 0 ? (
          users.map((user) => (
            <HStack
              key={user._id}
              p={3}
              borderRadius="md"
              bg={activeChat?.username === user.username ? "teal.300" : "white"}
              cursor="pointer"
              onClick={() => setActiveChat(user)}
              position="relative" // Needed for absolute positioning of the green dot
            >
              {/* Avatar with online indicator */}
              <Box position="relative">
                <Avatar size="sm" />
                {user.online && (
                  <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    w="10px"
                    h="10px"
                    bg="green.400"
                    borderRadius="full"
                    border="2px solid white"
                  />
                )}
              </Box>
              
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{user.username}</Text>
                <Text fontSize="sm" color="gray.500">
                  {messages[user.username]?.slice(-1)[0]?.text || "Last message..."}
                </Text>
              </VStack>
            </HStack>
          ))
        ) : (
          <Text p={4} fontSize="lg">
            No users available
          </Text>
        )}
      </VStack>

      {/* Chat Area */}
      <VStack flex={1} p={4} spacing={4} align="stretch" h="100vh">
        {activeChat ? (
          <>
            <Text fontSize="lg" fontWeight="bold" p={3} bg="gray.300" borderRadius="lg">
              Chat with {activeChat.username}
            </Text>
            <Box flex={1} p={4} bg="white" borderRadius="lg" display="flex" flexDirection="column" justifyContent="flex-end">
              {(messages[activeChat?.username] || []).map((msg, index) => (
                <HStack key={index} justify={msg.sender === authUser.username ? "flex-end" : "flex-start"}>
                  <Text bg={msg.sender === authUser.username ? "teal.100" : "gray.200"} p={3} borderRadius="md" maxW="70%">
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
          </>
        ) : (
          <Text p={4} fontSize="lg" fontWeight="bold">
            Select a user to start chatting
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default ChatApp;
