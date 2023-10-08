// Packages:
import { Component } from 'solid-js'
import { styled } from 'solid-styled-components'


// Styles:
const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 1.5rem);
  height: 1.75rem;
  padding: 0rem 0.75rem;
  background-color: #171717;
`

const Info = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  color: #5E5E5E;
`


// Functions:
const Footer: Component<{
  info: string
  metaInfo: string
}> = (props) => {
  return (
    <Wrapper>
      <Info>{ props.info }</Info>
      <Info>{ props.metaInfo }</Info>
    </Wrapper>
  )
}


// Exports:
export default Footer
