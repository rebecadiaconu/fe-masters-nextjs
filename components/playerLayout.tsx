import { Box } from '@chakra-ui/layout'
import SideBar from './sidebar'

const PlayerLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 250,
        }}
      >
        <SideBar />
      </Box>
      <Box
        sx={{
          marginLeft: 250,
          marginBottom: 100,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          borderColor: 'green',
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      >
        playbar
      </Box>
    </Box>
  )
}

export default PlayerLayout
