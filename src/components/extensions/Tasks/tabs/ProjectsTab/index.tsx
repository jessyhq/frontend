// Packages:
import { Component, For, Match, Setter, Switch } from 'solid-js'
import { styled } from 'solid-styled-components'
import {
  DragDropProvider,
  closestCenter,
  DragDropSensors,
  SortableProvider,
  DragEventHandler,
  Id
} from '@thisbeyond/solid-dnd'
import { SortableItem } from '../../../../../utils/drag-drop/sortable'
import Scrollbars from 'solid-custom-scrollbars'


// Typescript:
import { Dimensions, History } from '../..'

export interface BoardItem {
  id: string
  name: string
}

export interface ProjectItem extends SortableItem {
  id: string
  name: string
  boards: BoardItem[]
}

export interface ProjectsTabProps {
  push: (newHistoryItem: History) => void
  dimensions: Dimensions
  isMaximized: boolean
  isFocused: boolean
  onDragStart: DragEventHandler
  onDragEnd: DragEventHandler
  ids: Id[]
  allProjects: ProjectItem[]
  processedProjects: ProjectItem[]
  isSearchActive: boolean
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


// Components:
import ProjectSortable from '../../ProjectSortable'
import ProjectStandalone from '../../ProjectStandalone'


// Styles:
const Wrapper = styled.div<{
  width: number
  isMaximized: boolean
  isFocused: boolean
}>`
  width: ${ props => props.isMaximized ? window.innerWidth - 16 : props.width - 16 }px;
  height: 100%;
  padding: 8px;
  padding-top: 0;
  filter: opacity(${ props => props.isFocused ? 1 : 0 });
  transition: filter 0.25s ease;
`

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  color: #B8B8B8;
  font-size: 0.8rem;
  font-weight: 400;
  font-style: italic;
  user-select: none;
`


// Functions:
const ProjectsTab: Component<ProjectsTabProps> = (props) => {
  // Functions:
  const onBoardClick = (boardName: string) => {
    props.push({
      title: boardName,
      placeholder: 'Search for a task',
      footer: {
        info: '4 Tasks',
        metaInfo: 'Last Edited at 6:44 PM',
      }
    })
  }

  // Return:
  return (
    <Wrapper
      width={ props.dimensions.width }
      isMaximized={ props.isMaximized }
      isFocused={ props.isFocused }
    >
      <Scrollbars style={{ width: '100%', height: 'calc(100% - 9rem)' }}>
        <Switch>
          <Match when={ !props.isSearchActive }>
            <DragDropProvider
              onDragStart={ props.onDragStart }
              onDragEnd={ props.onDragEnd }
              collisionDetector={ closestCenter }
            >
              <DragDropSensors />
              <SortableProvider ids={ props.ids }>
                <For each={ props.allProjects }>
                  {
                    project => (
                      <ProjectSortable
                        projectID={ project.id }
                        projects={ props.allProjects }
                        onBoardClick={ onBoardClick }
                        addNewBoard={ props.addNewBoard }
                        updateProject={ props.updateProject }
                        newProjectID={ props.newProjectID }
                        setNewProjectID={ props.setNewProjectID }
                        superficialEditingProjectID={ props.superficialEditingProjectID }
                        setSuperficialEditingProjectID={ props.setSuperficialEditingProjectID }
                        updateBoard={ props.updateBoard }
                        newBoardID={ props.newBoardID }
                        setNewBoardID={ props.setNewBoardID }
                        superficialEditingBoardID={ props.superficialEditingBoardID }
                        setSuperficialEditingBoardID={ props.setSuperficialEditingBoardID }
                      />
                    )
                  }
                </For>
              </SortableProvider>
            </DragDropProvider>
          </Match>
          <Match when={ props.isSearchActive }>
            <Switch>
              <Match when={ props.processedProjects.length > 0 }>
                <For each={ props.processedProjects }>
                  {
                    project => (
                      <ProjectStandalone
                        projects={ props.allProjects }
                        project={ project }
                        onBoardClick={ onBoardClick }
                        updateBoard={ props.updateBoard }
                        newBoardID={ props.newBoardID }
                        setNewBoardID={ props.setNewBoardID }
                        superficialEditingBoardID={ props.superficialEditingBoardID }
                        setSuperficialEditingBoardID={ props.setSuperficialEditingBoardID }
                      />
                    )
                  }
                </For>
              </Match>
              <Match when={ props.processedProjects.length === 0 }>
                <NoResults>No results found</NoResults>
              </Match>
            </Switch>
          </Match>
        </Switch>
      </Scrollbars>
    </Wrapper>
  )
}


// Exports:
export default ProjectsTab
