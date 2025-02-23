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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContextProvider"; // Import useAuth from AuthContext

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuth(); // Use signup from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      toast({
        title: "All fields are required!",
        description: "Please fill out all fields before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await signup(trimmedName, trimmedEmail, trimmedPassword);
      
      toast({
        title: "Signup successful!",
        description: "Welcome to the app!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/"); // Redirect after successful signup
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8} mt={10}>
      <Heading>Sign Up</Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        w={{ base: "90%", md: "500px" }}
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <VStack spacing={4}>
          <FormControl id="name" isRequired isInvalid={!name.trim()}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired isInvalid={!email.trim()}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!password.trim()}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full" isLoading={isSigningUp}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default Signup;
