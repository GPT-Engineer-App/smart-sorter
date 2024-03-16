import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaHeartbeat } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-siby.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Account created.",
          description: "You can now log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to create account.",
          description: errorData.detail.map((e) => e.msg).join(", "),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network error.",
        description: "Couldn't connect to the server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-siby.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        toast({
          title: "Login successful.",
          description: "You're now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to log in.",
          description: errorData.detail.map((e) => e.msg).join(", "),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network error.",
        description: "Couldn't connect to the server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleHealthCheck = async () => {
    try {
      const response = await fetch("https://backengine-siby.fly.dev/healthcheck");
      const data = await response.json();
      toast({
        title: "Health Check",
        description: `Status: ${data.status}`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Network error.",
        description: "Couldn't connect to the server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container py={8}>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Stack direction="row" spacing={4}>
          <Button leftIcon={<FaUserPlus />} colorScheme="blue" onClick={handleSignup}>
            Sign Up
          </Button>
          <Button leftIcon={<FaSignInAlt />} colorScheme="green" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
        <Box textAlign="center">
          <Text mb={2}>Check Server Health</Text>
          <Button leftIcon={<FaHeartbeat />} colorScheme="red" onClick={handleHealthCheck}>
            Health Check
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Index;
