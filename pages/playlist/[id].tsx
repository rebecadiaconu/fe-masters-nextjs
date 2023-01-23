import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'
import GradientLayout from '../../components/gradientLayout'
import SongsTable from '../../components/songsTable'
import { AuthMode } from '../../lib/models'

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'teal',
    'gray',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  const bgColor = getBGColor(playlist.id)

  return (
    <GradientLayout
      color={bgColor}
      title={playlist.name}
      subtitle="Playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: `/${AuthMode.SIGN_IN}`,
      },
    }
  }
  const playlist = await prisma.playlist.findFirst({
    where: { id: +query.id, userId: user.id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}

export default Playlist
