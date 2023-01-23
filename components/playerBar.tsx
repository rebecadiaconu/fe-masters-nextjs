import { Box, Text } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import { useStoreState } from 'easy-peasy'
import Player from './player'

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)

  return (
    <Box
      height="100px"
      width="100vw"
      bg="gray.900"
      padding="10px"
      color="white"
    >
      <Flex justify="space-between" align="center" height="100%">
        {activeSong ? (
          <>
            <Box padding="20px" width="30%">
              <Text fontSize="large">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </Box>
            <Box width="40%">
              <Player songs={songs} activeSong={activeSong} />
            </Box>
            <Box width="30%" />
          </>
        ) : null}
      </Flex>
    </Box>
  )
}

export default PlayerBar
