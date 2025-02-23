// src/components/Navbar.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom';

const Links = [
  { name: 'chat', path: '/' },
  { name: 'Announcements', path: '/announcements' },
  { name: 'Resources', path: '/resources' },
];

const NavLink = ({ to, children }) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.200',
    }}
    _activeLink={{
      fontWeight: 'bold',
      color: 'teal.500',
    }}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Box bg={'gray.100'} px={4} boxShadow="md">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {isAuthenticated ? (
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/signup"
                variant={'outline'}
                colorScheme={'teal'}
                size={'sm'}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
