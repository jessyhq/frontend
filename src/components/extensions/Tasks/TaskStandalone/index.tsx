// Packages:
import { Component, createEffect, createSignal } from 'solid-js'
import { createSortable, Id, useDragDropContext } from '@thisbeyond/solid-dnd'


// Typescript:
import { TaskItem } from '../tabs/TasksTab'

export interface TaskSortableProps {
  taskID: Id
  tasks: TaskItem[]
  toggleTaskDone: (id: Id, newValue: boolean) => void
  onTaskClick: (task?: TaskItem) => void
}


// Imports:
import { VsEdit } from 'solid-icons/vs'


// Components:
import CheckBox from '../../../utils/CheckBox'


// Styles:
import {
  Wrapper,
  TaskName,
  TaskActionButtonWrapper
} from './styles'


// Functions:
const TaskStandalone: Component<TaskSortableProps> = (props) => {
  // Signals:
  const [ task, setTask ] = createSignal(props.tasks.find(task => task.id === props.taskID))

  // Functions:
  const toggleTaskDone = (newValue: boolean) => {
    props.toggleTaskDone(props.taskID, newValue)
  }

  // Effects:
  createEffect(() => {
    setTask(props.tasks.find(task => task.id === props.taskID))
  })

  // Return:
  return (
    <Wrapper isActive={ false }>
      <div style={{ display: 'flex', 'align-items': 'center', width: '90%', height: '100%', cursor: 'pointer' }}>
        <CheckBox
          isDone={ props.tasks.find(task => task.id === props.taskID)?.isDone ?? false }
          onClick={ toggleTaskDone }
        />
        {/* TODO: Change task()?.name to props.tasks.find(task => task.id === props.taskID)?.name ?? '' */}
        <TaskName onClick={ () => props.onTaskClick(task()) }>{ task()?.name }</TaskName>
      </div>
      <TaskActionButtonWrapper>
        <VsEdit color='#E2E2E2' style={{ 'font-size': '1rem' }} />
      </TaskActionButtonWrapper>
    </Wrapper>
  )
}


// Exports:
export default TaskStandalone
