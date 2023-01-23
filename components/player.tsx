import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react'
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md'
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReactHowler from 'react-howler'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatters'

interface ControlButton {
  alias: string
  isComplex?: boolean
  icon: ReactElement
  color?: string

  onClick?(): void
}

const Player = ({ songs, activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  )
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)

  const soundRef = useRef(null)
  const repeatRef = useRef(repeat)

  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

  const handleChangePlaying = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleOnShuffle = useCallback(() => {
    setShuffle((state) => !state)
  }, [])

  const handleOnRepeat = useCallback(() => {
    setRepeat((state) => !state)
  }, [])

  const handleOnSkipPrevious = useCallback(() => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }, [songs.length])

  const handleOnSkipNext = useCallback(() => {
    setIndex((state) => {
      if (shuffle) {
        const nextSong = Math.floor(Math.random() * songs.length)
        if (nextSong === state) {
          return handleOnSkipNext()
        }

        return nextSong
      }

      return state === songs.length - 1 ? 0 : state + 1
    })
  }, [shuffle, songs.length])

  const handleOnEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current?.seek(0)
    } else {
      handleOnSkipNext()
    }
  }

  const handleOnLoad = () => {
    const songDuration = soundRef.current?.duration()
    setDuration(songDuration)
  }

  const handleOnSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current?.seek(e[0])
  }

  const controlButtons = useMemo<ControlButton[]>(
    () => [
      {
        alias: 'shuffle',
        isComplex: false,
        icon: <MdShuffle />,
        color: shuffle ? 'white' : null,
        onClick: handleOnShuffle,
      },
      {
        alias: 'skip-previous',
        isComplex: false,
        icon: <MdSkipPrevious />,
        onClick: handleOnSkipPrevious,
      },
      {
        alias: isPlaying ? 'pause' : 'play',
        isComplex: true,
        icon: isPlaying ? (
          <MdOutlinePauseCircleFilled />
        ) : (
          <MdOutlinePlayCircleFilled />
        ),
        onClick: handleChangePlaying,
      },
      {
        alias: 'skip-next',
        isComplex: false,
        icon: <MdSkipNext />,
        onClick: handleOnSkipNext,
      },
      {
        alias: 'repeat',
        isComplex: false,
        icon: <MdOutlineRepeat />,
        color: repeat ? 'white' : null,
        onClick: handleOnRepeat,
      },
    ],
    [
      handleChangePlaying,
      handleOnRepeat,
      handleOnShuffle,
      handleOnSkipNext,
      handleOnSkipPrevious,
      isPlaying,
      repeat,
      shuffle,
    ]
  )

  useEffect(() => {
    let timerId

    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current?.seek())
        timerId = requestAnimationFrame(f)
      }

      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }

    cancelAnimationFrame(timerId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={isPlaying}
          src={activeSong?.url}
          onLoad={handleOnLoad}
          onEnd={handleOnEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          {controlButtons.map((btn) => (
            <IconButton
              aria-label={btn.alias}
              outline="none"
              variant="link"
              fontSize={btn.isComplex ? '40px' : '24px'}
              color={btn.color ?? btn.isComplex ? 'white' : 'gray.600'}
              icon={btn.icon}
              onClick={() => btn.onClick()}
            />
          ))}
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="x-small">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              id="player-range"
              value={[seek]}
              onChange={handleOnSeek}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="x-small">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
