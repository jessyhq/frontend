// Packages:
import { styled } from 'solid-styled-components'


// Styles:
export const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: baseline;
  height: 1.5rem;
  padding: 0.5rem;
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

export const TaskName = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 1.75rem);
  height: calc(100% + 1rem);
  margin-left: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #E2E2E2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EditableTaskName = styled.input`
  display: flex;
  align-items: center;
  width: calc(100% - 1.75rem);
  height: calc(100% + 1rem);
  margin-left: 0.5rem;
  padding-block: 0px;
  padding-inline: 0px;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  color: #E2E2E2;
  outline: none;
  border: none;
  background-color: transparent;
`

export const TaskActionButtonWrapper = styled.div<{ dontHide?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  filter: opacity(${ props => props.dontHide ? 1 : 0 });
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: opacity(1);
    transition: all 0.25s ease;
  }
`
