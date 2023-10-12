// Packages:
import type { Component } from 'solid-js'
import { styled } from 'solid-styled-components'
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd'
import createArbitraryDragHandlers from './utils/drag-drop/arbitrary'


// Components:
import Tasks from './components/extensions/Tasks'
import Music from './components/extensions/Music'
import Footer from './components/utils/Footer'


// Styles:
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2400-5630.jpg);
  background-size: cover;
  background-position: center;
  overflow: hidden;
`


// Functions:
const App: Component = () => {
  // Functions:
  const { onDragMove, onDragEnd } = createArbitraryDragHandlers()

  // Return:
  return (
    <Wrapper>
      <DragDropProvider onDragMove={onDragMove} onDragEnd={onDragEnd}>
        <DragDropSensors />
        <Tasks id={1} />
        <Music id={2} />
      </DragDropProvider>
      {/* <Footer info='123' metaInfo='23' /> */}
    </Wrapper>
  )
}


// Exports:
export default App
