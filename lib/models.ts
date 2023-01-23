// eslint-disable-next-line no-shadow
export enum AuthMode {
  // eslint-disable-next-line no-unused-vars
  SIGN_UP = 'signup',
  // eslint-disable-next-line no-unused-vars
  SIGN_IN = 'signin',
}

export interface Playlist {
  id: number
  createdAt?: Date
  updatedAt?: Date
  name: string
  // eslint-disable-next-line no-use-before-define
  songs?: Song[]
  // eslint-disable-next-line no-use-before-define
  user?: User
  userId?: number
}

export interface Song {
  id: number
  createdAt?: Date
  updatedAt?: Date
  name: string
  // eslint-disable-next-line no-use-before-define
  artist: Artist
  artistId: number
  playlists?: Playlist[]
  duration: number
  url: string
}

export interface Artist {
  id: number
  createdAt?: Date
  updatedAt?: Date
  name: string
  songs?: Song[]
}

export interface User {
  id: number
  createdAt?: Date
  updatedAt?: Date
  email: string
  playlists?: Playlist[]
}
