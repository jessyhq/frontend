// Packages:
import { Component, For, Match, Setter, Switch } from 'solid-js'
import { styled } from 'solid-styled-components'
import {
  closestCenter,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  Id,
  SortableProvider
} from '@thisbeyond/solid-dnd'
import Scrollbars from 'solid-custom-scrollbars'
import { SortableItem } from '../../../../../utils/drag-drop/sortable'


// Typescript:
import { Dimensions } from '../..'

export enum Priority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
}

export interface SubTaskItem {
  id: string
  name: string
  isDone: boolean
}

export interface Tag {
  id: string
  text: string
}

export interface TaskItem extends SortableItem {
  id: string
  name: string
  isDone: boolean
  description: string
  tags: Tag[]
  priority: Priority
  subtasks: SubTaskItem[]
}

export interface TasksTabProps {
  dimensions: Dimensions
  isMaximized: boolean
  onDragStart: DragEventHandler
  onDragEnd: DragEventHandler
  ids: Id[]
  allTasks: TaskItem[]
  processedTasks: TaskItem[]
  toggleTaskDone: (id: Id, newValue: boolean) => void
  onTaskClick: (task?: TaskItem) => void
  isFocused: boolean
  isSearchActive: boolean
  addNewTask: (boardID: string) => void
  updateTask: (newTask: TaskItem) => void
  newTaskID: string | null
  setNewTaskID: Setter<string | null>
  superficialEditingTaskID: Id | null
  setSuperficialEditingTaskID: Setter<Id | null>
}


// Imports:
import { RiSystemAddFill } from 'solid-icons/ri'


// Components:
import GeneralButton from '../../../../utils/Buttons/GeneralButton'
import TaskSortable from '../../TaskSortable'
import TaskStandalone from '../../TaskStandalone'


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
const TasksTab: Component<TasksTabProps> = (props) => {
  return (
    <Wrapper
      width={ props.dimensions.width }
      isMaximized={ props.isMaximized }
      isFocused={ props.isFocused }
    >
      <GeneralButton
        content={
          <>
            <RiSystemAddFill size={'1rem'} style={{ 'margin-right': '0.25rem' }} />
            Add Task
          </>
        }
        onClick={ () => props.addNewTask('') }
      />
      <Scrollbars style={{ width: '100%', height: 'calc(100% - 12rem)', 'margin-top': '0.5rem' }}>
        <Switch>
          <Match when={ !props.isSearchActive }>
            <DragDropProvider
              onDragStart={ props.onDragStart }
              onDragEnd={ props.onDragEnd }
              collisionDetector={ closestCenter }
            >
              <DragDropSensors />
              <SortableProvider ids={ props.ids }>
                <For each={ props.allTasks }>
                  {
                    task => (
                      <TaskSortable
                        taskID={ task.id }
                        tasks={ props.allTasks }
                        toggleTaskDone={ props.toggleTaskDone }
                        onTaskClick={ props.onTaskClick }
                        updateTask={ props.updateTask }
                        newTaskID={ props.newTaskID }
                        setNewTaskID={ props.setNewTaskID }
                        superficialEditingTaskID={ props.superficialEditingTaskID }
                        setSuperficialEditingTaskID={ props.setSuperficialEditingTaskID }
                      />
                    )
                  }
                </For>
              </SortableProvider>
            </DragDropProvider>
          </Match>
          <Match when={ props.isSearchActive }>
            <Switch>
              <Match when={ props.processedTasks.length > 0 }>
                <For each={ props.processedTasks }>
                  {
                    task => (
                      <TaskStandalone
                        taskID={ task.id }
                        tasks={ props.allTasks }
                        toggleTaskDone={ props.toggleTaskDone }
                        onTaskClick={ props.onTaskClick }
                      />
                    )
                  }
                </For>
              </Match>
              <Match when={ props.processedTasks.length === 0 }>
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
export default TasksTab
