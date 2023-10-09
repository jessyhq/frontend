// Packages:
import { Component, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'


// Typescript:
export enum MusicService {
  APPLE_MUSIC = 'APPLE_MUSIC',
  SPOTIFY = 'SPOTIFY',
  SOUNDCLOUD = 'SOUNDCLOUD',
  YOUTUBE_MUSIC = 'YOUTUBE_MUSIC',
}


// Styles:
const Wrapper = styled.div``


// Functions:
const Music: Component = (props) => {
  // Signals:
  const [ musicService, setMusicService ] = createSignal()

  // Return:
  return (
    <Wrapper>
      
    </Wrapper>
  )
}


// Exports:
export default Music
