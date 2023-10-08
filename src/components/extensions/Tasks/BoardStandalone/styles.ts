// Packages:
import { styled } from 'solid-styled-components'


// Exports:
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0.5rem;
  padding-left: 1rem;
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: rgba(100, 100, 100, 0.3);
    transition: all 0.25s ease;
  }
`

export const Name = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #D1D1D1;
`

export const EditableBoardName = styled.input`
  padding-block: 0px;
  padding-inline: 0px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: #D1D1D1;
  outline: none;
  border: none;
  background-color: transparent;
`

export const BoardButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`

export const EditIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.3rem;
  height: 1.3rem;
  background-color: transparent;
  border-radius: 50%;
  transition: all 0.25s ease;

  &:hover {
    background-color: rgba(175, 175, 175, 0.3);
    transition: all 0.25s ease;
  }
`
