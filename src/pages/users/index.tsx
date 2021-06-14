import NextLink from 'next/link';
import { useState } from 'react';
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
  Spinner,
  Link
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from "components/Header";
import { Pagination } from "components/Pagination";
import { Sidebar } from "components/Sidebar";
import { useUsers } from 'services/hooks/useUsers';
import { queryClient } from 'services/queryClient';
import { api } from 'services/api';


export default function UsersList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);
      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 min
    });
  }

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

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize={["xs", "sm"]}
                colorScheme="pink"
                leftIcon={isWideVersion ? <Icon as={RiAddLine} fontSize="20" /> : undefined}
              >
                {isWideVersion ? 'Criar novo usuário' : <Icon as={RiAddLine} fontSize="20" />}
              </Button>
            </NextLink>
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
                  {data.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["2", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold" fontSize={["xs", "md"]}>{user.name}</Text>
                            </Link>
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

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
