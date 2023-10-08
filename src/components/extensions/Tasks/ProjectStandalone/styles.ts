// Packages:
import { styled } from 'solid-styled-components'


// Styles:
export const Wrapper = styled.div<{ isActive: boolean }>`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(100, 100, 100, 0.15);
  border-radius: 5px;
  user-select: none;
  transition: background-color 0.25s ease, transform 0.15s ease;

  &:hover {
    background-color: ${ props => props.isActive ? 'rgba(100, 100, 100, 0.5)' : 'rgba(100, 100, 100, 0.2)' };
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Name = styled.div`
  width: -webkit-fill-available;
  font-size: 0.95rem;
  font-weight: 500;
  color: #E2E2E2;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`

export const UndraggableName = styled(Name)`
  cursor: unset;

  &:active {
    cursor: unset;
  }
`

export const EditableProjectName = styled.input`
  padding-block: 0px;
  padding-inline: 0px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  color: #E2E2E2;
  outline: none;
  border: none;
  background-color: transparent;
`

export const ProjectButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`
