import { Box, Text } from '@chakra-ui/layout'
import { Flex, Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'
import { useMe } from '../lib/hooks'

const bgColor = 'purple'

const Home = ({ artists }) => {
  const { user } = useMe()

  return (
    <GradientLayout
      color={bgColor}
      subtitle="Profile"
      title={user ? `${user.firstName} ${user.lastName}` : ''}
      description={`${user?.playlistsCount ?? 0} public playlists`}
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingRight="20px" width="20%" key={artist.id}>
              <Box
                bgGradient={`linear(to-b, ${bgColor}.600 0%, ${bgColor}.700 15%, rgba(0,0,0,0.75) 95%)`}
                borderRadius="4px"
                padding="15px"
                width="100%"
              >
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

// any props returned by this func will be loaded in the Home component
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default Home
