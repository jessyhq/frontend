// Packages:
import { Component, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'


// Typescript:
export interface SearchProps {
  placeholder: string
  searchQuery: string
  setSearchQuery: (newQuery: string) => void
  searchFunction: (query: string) => void
  setIsSearchActive: (value: boolean) => void
}


// Imports:
import { VsSearch } from 'solid-icons/vs'


// Styles:
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.75rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #606B6BB1;
  transition: all 0.25s ease;
`

const Input = styled.input<{ placeholderColor: string }>`
  width: -webkit-fill-available;
  height: 100%;
  font-family: inherit;
  font-weight: 300;
  color: #FFFFFF;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    font-family: inherit;
    font-weight: 500;
    font-style: italic;
    color: ${ props => props.placeholderColor };
    transition: all 0.25s ease;
  }
`


// Functions:
const Search: Component<SearchProps> = (props) => {
  // Signals:
  const [ color, setColor ] = createSignal('#757575')

  // Functions:
  const handleInputChange = (e: Event & {
    currentTarget: HTMLInputElement
    target: Element
  }) => {
    const query = e.currentTarget.value.trim()
    props.setSearchQuery(query)
    if (query.length === 0) props.setIsSearchActive(false)
    else {
      props.setIsSearchActive(true)
      props.searchFunction(query)
    }
  }

  // Return:
  return (
    <Wrapper>
      <VsSearch color={ color() } style={{ 'margin-right': '0.5rem' }} />
      <Input
        type='text'
        placeholder={ props.placeholder }
        value={ props.searchQuery }
        placeholderColor={ color() }
        onKeyUp={ handleInputChange }
        onFocus={ () => setColor('#FFFFFF') }
        onBlur={ () => setColor('#5E5E5E') }
      />
    </Wrapper>
  )
}


// Exports:
export default Search
