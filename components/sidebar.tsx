import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/layout'
import NextImage from 'next/image'
import NextLink from 'next/link'

import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from 'react-icons/md'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
]

const playlists = new Array(30).fill(1).map((_item, i) => `Playlist ${i + 1}`)

const MenuItem = ({ menuItem }) => {
  return (
    <ListItem paddingX="20px" fontSize="16px">
      <LinkBox>
        <NextLink href={menuItem.route} passHref>
          <LinkOverlay>
            <ListIcon as={menuItem.icon} color="white" marginRight="20px" />
            {menuItem.name}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  )
}

const SideBar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <MenuItem menuItem={menu} key={menu.name} />
            ))}
          </List>
        </Box>
        <Box marginY="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <MenuItem menuItem={menu} key={menu.name} />
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="calc(66% - 20px)" overflowY="auto" paddingY="20px">
          <List spacing={1} sx={{ height: '100%' }}>
            {playlists.map((playlist) => (
              <ListItem paddingX="20px" key={playlist}>
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
