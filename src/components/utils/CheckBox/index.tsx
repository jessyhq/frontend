// Packages:
import { Component, Show } from 'solid-js'
import { styled } from 'solid-styled-components'


// Imports:
import { VsCheck } from 'solid-icons/vs'


// Styles:
const Wrapper = styled.div<{ isDone: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  background-color: ${ props => props.isDone ? '#1D61E57F' : '#0E10107F' };
  border: 1px solid ${ props => props.isDone ? '#1D61E5' : '#6D6D6D' };
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease;
`

const CheckBox: Component<{
  isDone: boolean
  onClick: (newValue: boolean) => void
}> = (props) => (
  <Wrapper isDone={ props.isDone } onClick={ () => props.onClick(!props.isDone) }>
    <Show when={ props.isDone }><VsCheck color='#E2E2E2' font-size='0.75rem' /></Show>
  </Wrapper>
)

// Exports:
export default CheckBox
