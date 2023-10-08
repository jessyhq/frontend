// Packages:
import { Component, JSX, children } from 'solid-js'
import { styled } from 'solid-styled-components'


// Styles:
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding: 0 0.5rem;
`


// Functions:
const NavigationBar: Component<{ children: JSX.Element }> = (props) => {
  // Ref:
  const resolvedChildren = children(() => props.children)

  // Return:
  return (
    <Wrapper>{ resolvedChildren }</Wrapper>
  )
}


// Exports:
export default NavigationBar
