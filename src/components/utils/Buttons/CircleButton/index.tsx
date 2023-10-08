// Packages:
import { RiSystemAddFill } from 'solid-icons/ri';
import { Component, JSX, JSXElement } from 'solid-js'
import { styled } from 'solid-styled-components'


// Styles:
const Wrapper = styled.div<{
  backgroundColor?: string;
  hoverBackgroundColor?: string
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  font-weight: 400;
  font-size: 0.8rem;
  color: #FFFFFF;
  background-color: ${ props => props.backgroundColor ? props.backgroundColor : '#1D61E5' };
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${ props => props.hoverBackgroundColor ? props.hoverBackgroundColor : '#3D75E6' };
    transition: all 0.25s ease;
  }
`


// Functions:
const CircleButton: Component<{
  buttonStyle?: Omit<JSX.CSSProperties & {
    backgroundColor?: string
    hoverBackgroundColor?: string
  }, 'background-color'>
  onClick?: () => void
  children: JSXElement
}> = (props) => (
  <Wrapper
    style={ props.buttonStyle }
    backgroundColor={ props.buttonStyle?.backgroundColor }
    hoverBackgroundColor={ props.buttonStyle?.hoverBackgroundColor }
    onClick={ props.onClick }
  >
    { props.children }
  </Wrapper>
)


// Exports:
export default CircleButton
