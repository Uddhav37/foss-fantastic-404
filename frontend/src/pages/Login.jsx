// src/pages/Login.jsx
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Implement your authentication logic here
      // For demonstration, we'll assume a successful login
      toast({
        title: 'Login successful.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    };
  
    return (
      <VStack spacing={8} mt={10}>
        <Heading>Login</Heading>
        <Box
          as="form"
          onSubmit={handleSubmit}
          w={{ base: '90%', md: '500px' }}
          p={8}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </VStack>
        </Box>
      </VStack>
    );
  };
  
  export default Login;
  