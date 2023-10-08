// Packages:
import { Component } from 'solid-js'
import { styled } from 'solid-styled-components'


// Typescript:
export interface TagProps {
  id: string
  text: string
  deleteTag: (id: string) => void
}


// Imports:
import { VsChromeClose } from 'solid-icons/vs'


// Styles:
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
  width: fit-content;
  max-width: 3.5rem;
  height: 100%;
  padding: 0.125rem 0.25rem;
`

const Text = styled.div`
  max-width: 3rem;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.25rem;
  height: 0.25rem;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: rgba(175, 175, 175, 0.3);
    transition: all 0.25s ease;
  }
`


// Functions:
const Tag: Component<TagProps> = (props) => {
  return (
    <Wrapper>
      <Text>{ props.text }</Text>
      <IconWrapper onClick={ () => props.deleteTag(props.id) }>
        <VsChromeClose font-size='0.5rem' />
      </IconWrapper>
    </Wrapper>
  )
}


// Exports:
export default Tag
