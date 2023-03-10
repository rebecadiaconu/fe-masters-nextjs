import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
// import { useSWRConfig } from 'swr'
// import { auth } from "../lib/mutations";
import React, { useState } from 'react'
import NextImage from 'next/image'
import { AuthMode } from '../lib/models'
import { auth } from '../lib/mutations'

interface AuthFormProps {
  mode: AuthMode
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const user = await auth(mode, {
      email,
      password,
    })
    setIsLoading(false)
    router.push('/').then()
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height="60px" width="120px" />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
