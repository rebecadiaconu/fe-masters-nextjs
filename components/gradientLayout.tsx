import React from 'react'
import { Box, Text } from '@chakra-ui/layout'
import { Flex, Image } from '@chakra-ui/react'

const GradientLayout = ({
  color,
  title = '',
  subtitle = '',
  description = '',
  image = null,
  roundImage = false,
  children,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 40%, ${color}.700 60%, rgba(0,0,0,0.95) 85%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            borderRadius={roundImage ? '100%' : '3px'}
            src={image}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
