// src/pages/Signup.jsx
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
  
  const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Implement your registration logic here
      // For demonstration, we'll assume a successful registration
      toast({
        title: 'Account created.',
        description: "Your account has been successfully created.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    };
  
    return (
      <VStack spacing={8} mt={10}>
        <Heading>Sign Up</Heading>
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
              Sign Up
            </Button>
          </VStack>
        </Box>
      </VStack>
    );
  };
  
  export default Signup;
  