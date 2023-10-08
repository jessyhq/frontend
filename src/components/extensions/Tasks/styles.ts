// Packages:
import { styled } from 'solid-styled-components'


// Typescript:
import { Dimensions } from './'


// Styles:
export const Wrapper = styled.div<{
  isMaximized: boolean
  isWindowSizeTransitioning: boolean
  dimensions: Dimensions
}>`
  position: absolute;
  top: ${ props => props.isMaximized ? '0px !important' : `calc(50% - ${ props.dimensions.height / 2 }px)` };
  left: ${ props => props.isMaximized ? '0px !important' : `calc(50% - ${ props.dimensions.width / 2 }px)` };
  width: ${ props => props.isMaximized ? 'calc(100vw - 1px)' : `${ props.dimensions.width }px` };
  height: ${ props => props.isMaximized ? '100vh' : `${ props.dimensions.height }px` };
  background-color: rgba(30, 36, 36, 0.7);
  border: ${ props => props.isMaximized ? '0px' : '1px' } solid rgba(61, 66, 68, 0.7);
  border-radius: ${ props => props.isMaximized ? '0' : '1rem' };
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: ${
    props => (
      props.isMaximized ||
      !props.isMaximized && props.isWindowSizeTransitioning
    ) ? 'all 0.25s ease' : 'none'
  };
`

export const ScrollableBody = styled.div`
  height: 100%;
  overflow: hidden;
`

export const TabsHolder = styled.div<{
  width: number
  navLevel: number
  isMaximized: boolean
}>`
  display: flex;
  width: ${ props => (props.isMaximized ? window.innerWidth : props.width) * 3 }px;
  height: 100%;
  transform: ${ props => props.isMaximized ? `translateX(${ props.navLevel * -window.innerWidth }px)` : `translateX(${ props.navLevel * -20 * 16 }px)` };
  transition: all 0.25s ease;
`

export const ConditionalVisibility = styled.div<{ show: boolean }>`
  filter: opacity(${ props => props.show ? 1 : 0 });
  transition: all 0.25s ease;
`
