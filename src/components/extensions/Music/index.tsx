// Packages:
import { Component, createSignal } from 'solid-js'
import { createDraggable, transformStyle } from '@thisbeyond/solid-dnd'
import { createStore } from 'solid-js/store'
import sleep from 'sleep-promise'


// Typescript:
export enum MusicService {
  APPLE_MUSIC = 'APPLE_MUSIC',
  SPOTIFY = 'SPOTIFY',
  SOUNDCLOUD = 'SOUNDCLOUD',
  YOUTUBE_MUSIC = 'YOUTUBE_MUSIC',
}

export interface Dimensions {
  width: number
  height: number
}


// Components:
import Spotify from 'solid-spotify-embed'
import TopBar from '../../utils/TopBar'
import { Wrapper } from './styles'
import Footer from '../../utils/Footer'


// Functions:
const Music: Component<{ id: number }> = (props) => {
  // Ref:
  const draggable = createDraggable(props.id)

  // Signals:
  const [musicService, setMusicService] = createSignal()
  const [isMaximized, setIsMaximized] = createSignal(false)
  const [isMinimized, setIsMinimized] = createSignal(false)
  const [isWindowSizeTransitioning, setIsWindowSizeTransitioning] = createSignal(false)
  const [dimensions, setDimensions] = createStore<Dimensions>({
    width: 20 * 16,
    height: 11 * 16
  })

  const toggleMaximize = async (newValue: boolean) => {
    setIsWindowSizeTransitioning(true)
    setIsMaximized(newValue)
    await sleep(250)
    setIsWindowSizeTransitioning(false)
  }

  const toggleMinimize = async (newValue: boolean) => {
    setIsWindowSizeTransitioning(true)
    setIsMaximized(newValue)
    await sleep(250)
    setIsWindowSizeTransitioning(false)
  }

  // Return:
  return (
    <Wrapper
      ref={draggable.ref}
      style={transformStyle(draggable.transform)}
      isMaximized={isMaximized()}
      isWindowSizeTransitioning={isWindowSizeTransitioning()}
      dimensions={dimensions}
    >
      <div {...draggable.dragActivators}>
        <TopBar
          title={'🎹 Music'}
          isMaximized={isMaximized()}
          toggleMaximize={toggleMaximize}
          isMinimized={isMinimized()}
          toggleMinimize={toggleMinimize}
        />
      </div>
      <Spotify wide link='https://open.spotify.com/track/1v7L65Lzy0j0vdpRjJewt1?si=7b569d1cf3954f88' style={{ 'background': '#121212', 'padding-top': '5px' }} />
      <Footer
        info={'Spotify'}
        metaInfo={'Playing'}
      />
    </Wrapper>
  )
}


// Exports:
export default Music
