// Packages:
import { Component, Match, Setter, Show, Switch, createEffect, createSignal } from 'solid-js'


// Typescript:
import { Id } from '@thisbeyond/solid-dnd'
import { BoardItem, ProjectItem } from '../tabs/ProjectsTab'

export interface BoardStandaloneProps {
  projectID: Id
  boardID: Id
  projects: ProjectItem[]
  onBoardClick: (boardName: string) => void
  updateBoard: (projectID: Id, newBoard: BoardItem) => void
  newBoardID: string | null
  setNewBoardID: Setter<string | null>
  superficialEditingBoardID: Id | null
  setSuperficialEditingBoardID: Setter<Id | null>
}


// Imports:
import { VsCheck, VsChevronRight, VsEdit } from 'solid-icons/vs'


// Styles:
import {
  Wrapper,
  EditableBoardName,
  Name,
  BoardButtons,
  EditIconWrapper,
} from './styles'
import { ConditionalVisibility } from '../styles'


// Functions:
const BoardStandalone: Component<BoardStandaloneProps> = (props) => {
  // Ref:
  let nameInputRef: HTMLInputElement | undefined

  // Signals:
  const [ board, setBoard ] = createSignal(
    props.projects
      .find(project => project.id === props.projectID)?.boards
      .find(board => board.id === props.boardID)
  )
  const [ boardName, setBoardName ] = createSignal(board()?.name)
  const [ editMode, setEditMode ] = createSignal(false)
  const [ showEditIcon, setShowEditIcon ] = createSignal(false)
  const [ highlightEditIcon, setHighlightEditIcon ] = createSignal(false)

  // Functions:
  const setNewBoardName = (value: string) => {
    const focusedBoard = board()
    if (!focusedBoard) return
    const newBoard: BoardItem = {
      ...focusedBoard,
      name: value
    }
    if (props.superficialEditingBoardID === props.boardID) props.setSuperficialEditingBoardID(null)
    props.updateBoard(props.projectID, newBoard)
  }

  const onEditClick = (e?: MouseEvent) => {
    e?.stopPropagation()
    setEditMode(true)
    props.setSuperficialEditingBoardID(props.boardID)
    // Here, we have to wait for the next frame, because SolidJS
    // renders and assigns the ref in the previous one.
    requestAnimationFrame(() => {
      if (props.newBoardID === props.boardID) {
        props.setNewBoardID(null)
        nameInputRef?.select()
      } else nameInputRef?.focus()
    })
  }

  const updateBoardName = () => {
    const newName = boardName() ?? ''
    if (newName.trim().length === 0) return
    setNewBoardName(newName)
    setEditMode(false)
  }
  
  // Effects:
  createEffect(() => {
    setBoard(
      props.projects
        .find(project => project.id === props.projectID)?.boards
        .find(board => board.id === props.boardID)
    )
  })

  createEffect(() => {
    if (props.superficialEditingBoardID === props.boardID) onEditClick()
    else setEditMode(false)
  })
  
  // Return:
  return (
    <Show when={ typeof board()?.name === 'string' }>
      <Wrapper
        onClick={ () => props.onBoardClick(board()?.name as string) }
        onMouseOver={ () => setShowEditIcon(true) }
        onMouseOut={ () => setShowEditIcon(false) }
      >
        <Switch>
          <Match when={ editMode() }>
            <EditableBoardName
              ref={ el => nameInputRef = el }
              type='text'
              placeholder='Board Name'
              value={ board()?.name }
              onInput={ e => setBoardName(e.currentTarget.value) }
              onKeyDown={ e => e.key === 'Enter' && updateBoardName() }
            />
            <BoardButtons>
              <EditIconWrapper
                onClick={ updateBoardName }
                onMouseOver={ () => setHighlightEditIcon(true) }
                onMouseOut={ () => setHighlightEditIcon(false) }
              >
                <VsCheck
                  font-size={ '0.85rem' }
                  color={ highlightEditIcon() ? '#E6E6E6' : '#D1D1D1' }
                />
              </EditIconWrapper>
            </BoardButtons>
          </Match>
          <Match when={ !editMode() }>
            <Name>{board()?.name}</Name>
            <BoardButtons>
              <ConditionalVisibility show={ showEditIcon() }>
                <EditIconWrapper
                  onClick={ onEditClick }
                  onMouseOver={ () => setHighlightEditIcon(true) }
                  onMouseOut={ () => setHighlightEditIcon(false) }
                >
                  <VsEdit
                    font-size={ '0.75rem' }
                    color={ highlightEditIcon() ? '#E6E6E6' : '#D1D1D1' }
                  />
                </EditIconWrapper>
              </ConditionalVisibility>
              <VsChevronRight color='#D1D1D1' style={{ 'margin-right': '0.175rem' }} />
            </BoardButtons>
          </Match>
        </Switch>
      </Wrapper>
    </Show>
  )
}


// Exports:
export default BoardStandalone
