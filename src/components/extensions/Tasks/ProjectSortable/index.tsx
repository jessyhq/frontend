// Packages:
import { Component, For, Match, Setter, Switch, createEffect, createSignal } from 'solid-js'
import { Id, createSortable, useDragDropContext } from '@thisbeyond/solid-dnd'


// Typescript:
import { BoardItem, ProjectItem } from '../tabs/ProjectsTab'

export interface ProjectSortableProps {
  projectID: Id
  projects: ProjectItem[]
  onBoardClick: (boardName: string) => void
  addNewBoard: (projectID: Id) => void
  updateProject: (newProject: ProjectItem) => void
  newProjectID: string | null
  setNewProjectID: Setter<string | null>
  superficialEditingProjectID: Id | null
  setSuperficialEditingProjectID: Setter<Id | null>
  updateBoard: (projectID: Id, newBoard: BoardItem) => void
  newBoardID: string | null
  setNewBoardID: Setter<string | null>
  superficialEditingBoardID: Id | null
  setSuperficialEditingBoardID: Setter<Id | null>
}


// Imports:
import { VsCheck, VsEdit } from 'solid-icons/vs'
import { RiSystemAddFill } from 'solid-icons/ri'


// Components:
import CircleButton from '../../../utils/Buttons/CircleButton'
import BoardStandalone from '../BoardStandalone'


// Styles:
import {
  Wrapper,
  Header,
  Name,
  EditableProjectName,
  ProjectButtons
} from '../ProjectStandalone/styles'
import { ConditionalVisibility } from '../styles'


// Functions:
const ProjectSortable: Component<ProjectSortableProps> = (props) => {
  // Ref:
  let nameInputRef: HTMLInputElement | undefined

  // Constants:
  const sortable = createSortable(props.projectID)
  const state = useDragDropContext()

  // Signals:
  const [ project, setProject ] = createSignal(props.projects.find(project => project.id === props.projectID))
  const [ projectName, setProjectName ] = createSignal(project()?.name)
  const [ editMode, setEditMode ] = createSignal(false)
  const [ showEditIcon, setShowEditIcon ] = createSignal(false)

  // Functions:
  const setNewTaskName = (value: string) => {
    const focusedProject = project()
    if (!focusedProject) return
    const newProject: ProjectItem = {
      ...focusedProject,
      name: value
    }
    if (props.superficialEditingProjectID === props.projectID) props.setSuperficialEditingProjectID(null)
    props.updateProject(newProject)
  }

  const onEditClick = () => {
    setEditMode(true)
    props.setSuperficialEditingProjectID(props.projectID)
    // Here, we have to wait for the next frame, because SolidJS
    // renders and assigns the ref in the previous one.
    requestAnimationFrame(() => {
      if (props.newProjectID === props.projectID) {
        props.setNewProjectID(null)
        nameInputRef?.select()
      } else nameInputRef?.focus()
    })
  }

  const updateProjectName = () => {
    const newName = projectName() ?? ''
    if (newName.trim().length === 0) return
    setNewTaskName(newName)
    setEditMode(false)
  }

  // Effects:
  createEffect(() => {
    setProject(props.projects.find(project => project.id === props.projectID))
  })

  createEffect(() => {
    if (props.superficialEditingProjectID === props.projectID) onEditClick()
    else setEditMode(false)
  })

  // Return:
  return (
    <Wrapper
      ref={ sortable }
      isActive={ state?.[0].active.draggable?.id === props.projectID }
      onMouseOver={ () => setShowEditIcon(true) }
      onMouseOut={ () => setShowEditIcon(false) }
    >
      <Header>
        <Switch>
          <Match when={ editMode() }>
            <EditableProjectName
              ref={ el => nameInputRef = el }
              type='text'
              placeholder='Project Name'
              value={ project()?.name }
              onInput={ e => setProjectName(e.currentTarget.value) }
              onKeyDown={ e => e.key === 'Enter' && updateProjectName() }
            />
            <ProjectButtons>
              <CircleButton onClick={ updateProjectName }>
                <VsCheck size={'0.6rem'} style={{ 'margin-right': '0px' }} />
              </CircleButton>
            </ProjectButtons>
          </Match>
          <Match when={ !editMode() }>
            <Name>{ project()?.name }</Name>
            <ProjectButtons>
              <ConditionalVisibility show={ showEditIcon() }>
                <CircleButton onClick={ onEditClick }>
                  <VsEdit size={'0.6rem'} style={{ 'margin-right': '0px' }} />
                </CircleButton>
              </ConditionalVisibility>
              <CircleButton onClick={ () => props.addNewBoard(props.projectID) }><RiSystemAddFill size={'0.75rem'} style={{ 'margin-right': '0px' }} /></CircleButton>
            </ProjectButtons>
          </Match>
        </Switch>
      </Header>
      <For each={ project()?.boards }>
        {
          board => (
            <BoardStandalone
              projectID={ project()?.id as Id }
              boardID={ board.id }
              projects={ props.projects }
              onBoardClick={ props.onBoardClick }
              updateBoard={ props.updateBoard }
              newBoardID={ props.newBoardID }
              setNewBoardID={ props.setNewBoardID }
              superficialEditingBoardID={ props.superficialEditingBoardID }
              setSuperficialEditingBoardID={ props.setSuperficialEditingBoardID }
            />
          )
        }
      </For>
    </Wrapper>
  )
}


// Exports:
export default ProjectSortable
