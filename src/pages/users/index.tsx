import Link from 'next/link';
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
  useBreakpointValue,
  Center,
  Spinner
} from "@chakra-ui/react";
import { useQuery } from 'react-query';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from "components/Header";
import { Pagination } from "components/Pagination";
import { Sidebar } from "components/Sidebar";
import { api } from 'services/api';

export default function UsersList() {
  const { data, isLoading, isFetching, error } = useQuery('users', async () => {
    const response = await api.get('users');
    const { data } = response;

    const users = data.users.map(user => {
      return {
        ...user,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }
    });

    return users;
  }, {
    staleTime: 1000 * 5 // 5 sec
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px={["4", "6"]}>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["4", "8"]}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize={["xs", "sm"]}
                colorScheme="pink"
                leftIcon={isWideVersion ? <Icon as={RiAddLine} fontSize="20" /> : undefined}
              >
                {isWideVersion ? 'Criar novo usuário' : <Icon as={RiAddLine} fontSize="20" />}
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : error ? (
            <Center>
              <Text>Falha ao obter dados dos usuários</Text>
            </Center>
          ) : (
            <>
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
                  {data.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["2", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold" fontSize={["xs", "md"]}>{user.name}</Text>
                            <Text fontSize={["xs", "sm"]} color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
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
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
