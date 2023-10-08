// Packages::
import { styled } from 'solid-styled-components'


// Styles:
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  background-color: #171717;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`

export const Title = styled.div`
  margin-left: 0.75rem;
  font-weight: 400;
  font-size: 0.9rem;
  color: #E2E2E2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 6rem;
  height: 100%;
`

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 2rem;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #363636;
    transition: all 0.25s ease;
  }
`

export const CloseButton = styled(Button)`
  &:hover {
    background-color: #CC444B;
    transition: all 0.25s ease;
  }
`
