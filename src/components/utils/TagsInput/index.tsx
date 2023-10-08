// Packages:
import { Component, Setter } from 'solid-js'
import { styled } from 'solid-styled-components'
import { v4 as uuidv4 } from 'uuid'


// Typescript:
import { Tag } from '../../extensions/Tasks/tabs/TasksTab'

export interface TagsInputProps {
  addNewTag: (newTag: Tag) => void
  input: string
  setInput: Setter<string>
}


// Styles:
const Input = styled.input`
  height: 100%;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 400;
  color: #E2E2E2;
  outline: none;
  border: none;
  background-color: transparent;

  &::placeholder {
    font-style: italic;
    color: #777777;
    transition: all 0.25s ease;
  }

  &:focus::placeholder {
    font-style: italic;
    color: #829DE3;
    transition: all 0.25s ease;
  }
`

const Wrapper = styled.div`
  width: calc(70% - 1.025rem - 2px);
  height: 1.25rem;
  margin-top: 0.125rem;
  margin-left: 1px;
  padding: 0.25rem 0.5rem;
  background-color: #1D20207D;
  outline: none;
  border: 1px solid #3D4444B2;
  border-radius: 5px;
  transition: all 0.25s ease;

  &:focus-within {
    background-color: #1D61E533;
    border: 1px solid #1D61E5B2;
    transition: all 0.25s ease;
  }
`


// Functions:
const TagsInput: Component<TagsInputProps> = (props) => {
  // Ref:
  let inputRef: HTMLInputElement | undefined
  
  // Return:
  return (
    <Wrapper>
      <Input
        ref={ el => inputRef = el }
        placeholder='Add tags..'
        type='text'
        value={ props.input }
        onKeyUp={
          e => {
            if (e.key === 'Enter' || e.key === ',') {
              if (props.input.trim() === '') return
              props.addNewTag({
                id: uuidv4(),
                text: props.input.trim()
              })
              props.setInput('')
            } else props.setInput(e.currentTarget.value)
          }
        }
      />
    </Wrapper>
  )
}


// Exports:
export default TagsInput
