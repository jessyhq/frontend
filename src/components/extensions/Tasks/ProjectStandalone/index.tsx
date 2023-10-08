// Packages:
import { Component, For, Setter } from 'solid-js'


// Typescript:
import { BoardItem, ProjectItem } from '../tabs/ProjectsTab'
import { Id } from '@thisbeyond/solid-dnd'

export interface ProjectStandaloneProps {
  projects: ProjectItem[]
  project: ProjectItem
  updateBoard: (projectID: Id, newBoard: BoardItem) => void
  newBoardID: string | null
  setNewBoardID: Setter<string | null>
  superficialEditingBoardID: Id | null
  setSuperficialEditingBoardID: Setter<Id | null>
  onBoardClick: (boardName: string) => void
}


// Components:
import BoardStandalone from '../BoardStandalone'


// Styles:
import {
  Wrapper,
  Header,
  UndraggableName,
} from './styles'


// Functions:
const ProjectStandalone: Component<ProjectStandaloneProps> = (props) => (
  <Wrapper isActive={ false }>
    <Header>
      <UndraggableName>{ props.project.name }</UndraggableName>
    </Header>
    <For each={ props.project.boards }>
      {
        board => (
          <BoardStandalone
            projectID={ props.project.id }
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


// Exports:
export default ProjectStandalone
