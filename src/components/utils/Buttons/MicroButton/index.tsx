// Packages:
import { Component, JSX, children } from 'solid-js'
import { styled } from 'solid-styled-components'


// Styles:
const Wrapper = styled.div<{
  backgroundColor?: string;
  hoverBackgroundColor?: string
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: baseline;
  padding: 0.25rem 0.4rem;
  font-weight: 400;
  font-size: 0.8rem;
  color: #FFFFFF;
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : '#1D61E5' };
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${ props => props.hoverBackgroundColor ? props.hoverBackgroundColor : '#3D75E6' };
    transition: all 0.25s ease;
  }
`


// Functions:
const MicroButton: Component<{
  content: JSX.Element | string
  buttonStyle?: Omit<JSX.CSSProperties & {
    backgroundColor?: string
    hoverBackgroundColor?: string
  }, 'background-color'>
  onClick?: () => void
}> = (props) => {
  // Ref:
  const resolvedChildren = children(() => props.content)

  // Return:
  return (
    <Wrapper
      style={ props.buttonStyle }
      backgroundColor={ props.buttonStyle?.backgroundColor }
      hoverBackgroundColor={ props.buttonStyle?.hoverBackgroundColor }
      onClick={ props.onClick }
    >
      { resolvedChildren }
    </Wrapper>
  )
}


// Exports:
export default MicroButton
