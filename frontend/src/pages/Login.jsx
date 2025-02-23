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
  import { useAuth } from '../store/authContextProvider'; // Import useAuth


  
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { login,authUser } = useAuth(); // Get login function from context

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response=await login(email, password);
          console.log("ye mera area hai",response)

          if (response) {
              toast({
                  title: 'Login Successful',
                  description: "Welcome back!",
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
              });
              navigate('/'); // Redirect to dashboard on success
          } else {
              throw new Error(!response && 'Invalid credentials');
          }
      } catch (error) {
        console.log("the error is this error",error.message);
          toast({
              title: 'Login Failed',
              description: error.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
          });
      }
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
  