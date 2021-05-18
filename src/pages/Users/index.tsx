import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UsersList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px={["4", "6"]}>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["4","8"]}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Button
              as="a"
              size="sm"
              fontSize={["xs", "sm"]}
              colorScheme="pink"
              leftIcon={isWideVersion ? <Icon as={RiAddLine} fontSize="20" /> : undefined}
            >
              {isWideVersion ? 'Criar novo usuário' : <Icon as={RiAddLine} fontSize="20" />}
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["2", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th width={["2", "8"]}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["2", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold" fontSize={["xs", "md"]}>Matheus Henrique Moura Bezerra</Text>
                    <Text fontSize={["xs","sm"]} color="gray.300">sethwololo@gmail.com</Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>17 de maio de 2021</Td>}
                <Td px={["2", "8"]}>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={isWideVersion ? <Icon as={RiPencilLine} fontSize="16" /> : undefined}
                  >
                    {isWideVersion ? 'Editar' : <Icon as={RiPencilLine} fontSize="16" />}
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
