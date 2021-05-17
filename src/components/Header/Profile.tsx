import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Matheus Henrique</Text>
        <Text color="gray.350" fontSize="small">sethwololo@gmail.com</Text>
      </Box>
      <Avatar size="md" name="Matheus Henrique" src="https://github.com/sethwololo.png" />
    </Flex>
  );
}
