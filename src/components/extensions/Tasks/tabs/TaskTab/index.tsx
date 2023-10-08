// Packages:
import { Component, createEffect, createSignal, For, Match, Switch } from 'solid-js'
import { styled } from 'solid-styled-components'
import Scrollbars from 'solid-custom-scrollbars'
import { Id } from '@thisbeyond/solid-dnd'
import { debounce } from '@solid-primitives/scheduled'


// Typescript:
import { Dimensions } from '../..'
import { Tag, TaskItem } from '../TasksTab'

export interface TaskTabProps {
  dimensions: Dimensions
  isMaximized: boolean
  taskID: Id | null
  tasks: TaskItem[]
  toggleTaskDone: (id: Id, newValue: boolean) => void
  updateTask: (newTask: TaskItem) => void
  deleteTask: (taskID: Id) => void
  isFocused: boolean
}


// Imports:
import { VsCheck, VsEdit } from 'solid-icons/vs'


// Components:
import CheckBox from '../../../../utils/CheckBox'
import { TaskActionButtonWrapper, TaskName } from '../../TaskStandalone/styles'
import TagsInput from '../../../../utils/TagsInput'
import TagComponent from '../../../../utils/Tag'


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

const TaskDetails = styled.div`
  padding: 0.5rem;
`

const TaskDetailsHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Name = styled(TaskName)`
  width: calc(100% - 4.25rem);
  padding: 0.25rem 0.5rem;
  padding-left: 0.25rem;
`

const NameActionButtonWrapper = styled(TaskActionButtonWrapper)`
  justify-content: end;
  filter: opacity(1);
`

const NameInput = styled.input`
  width: calc(100% - 4.45rem - 2px);
  height: calc(100% + 1rem);
  margin-top: -1px;
  margin-left: calc(0.5rem - 1px);
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  color: #E2E2E2;
  background-color: #1D20207D;
  outline: none;
  border: 1px solid #3D4444B2;
  border-radius: 5px;
  transition: all 0.25s ease;

  &:focus {
    background-color: #1D61E533;
    border: 1px solid #1D61E5B2;
    transition: all 0.25s ease;
  }

  &::placeholder {
    font-style: italic;
    color: #777777;
    transition: all 0.25s ease;
  }

  &:focus::placeholder {
    font-style: italic;
    color: #829DE3;
    transition: all 0.25s ease;
  }
`

const TaskDetailsBody = styled.div`
  padding-top: 0.75rem;
`

const DescriptionTextArea = styled.textarea`
  width: calc(100% - 1rem - 2px);
  height: 4rem;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 400;
  color: #E2E2E2;
  background-color: #1D20207D;
  outline: none;
  border: 1px solid #3D4444B2;
  border-radius: 5px;
  resize: none;
  transition: all 0.25s ease;

  &:focus {
    background-color: #1D61E533;
    border: 1px solid #1D61E5B2;
    transition: all 0.25s ease;
  }

  &::placeholder {
    font-style: italic;
    color: #777777;
    transition: all 0.25s ease;
  }

  &:focus::placeholder {
    font-style: italic;
    color: #829DE3;
    transition: all 0.25s ease;
  }
`

const TaskMetaDetails = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`


// Functions:
const TaskTab: Component<TaskTabProps> = (props) => {
  // Ref:
  let nameInputRef: HTMLInputElement | undefined

  // Signals:
  const [ task, setTask ] = createSignal(props.tasks.find(task => task.id === props.taskID))
  const [ taskName, setTaskName ] = createSignal(task()?.name)
  const [ taskDescription, setTaskDescription ] = createSignal(task()?.description)
  const [ currentTagText, setCurrentTagText ] = createSignal('')
  const [ editMode, setEditMode ] = createSignal(false)

  // Effects:
  createEffect(() => {
    const focusedTask = props.tasks.find(task => task.id === props.taskID)
    setTask(focusedTask)
    setTaskName(focusedTask?.name)
  })

  createEffect(() => {
    if (props.taskID === null) setEditMode(false)
  })

  // Functions:
  const toggleTaskDone = (newValue: boolean) => {
    const ID = props.taskID
    if (ID) props.toggleTaskDone(ID, newValue)
  }

  const updateTask = (property: keyof TaskItem, value: any) => {
    const focusedTask = task()
    if (!focusedTask) return
    const newTask: TaskItem = {
      ...focusedTask,
      [ property ]: value
    }
    props.updateTask(newTask)
  }
  
  const onEditClick = () => {
    nameInputRef?.focus()
    setEditMode(true)
  }

  const updateTaskName = () => {
    const newName = taskName() ?? ''
    if (newName.trim().length === 0) return
    updateTask('name', newName)
    setEditMode(false)
  }

  const updateTaskDescription = debounce(() => {
    const newDescription = taskDescription() ?? ''
    updateTask('description', newDescription)
  }, 500)

  const addNewTaskTag = (tag: Tag) => {
    const tags = task()?.tags ?? []
    tags.push(tag)
    console.log(tags)
    updateTask('tags', tags)
  }

  const deleteTaskTag = (id: string) => {
    const tags = (task()?.tags ?? []).filter(tag => tag.id !== id)
    updateTask('tags', tags)
  }
  
  // Return:
  return (
    <Wrapper
      width={ props.dimensions.width }
      isMaximized={ props.isMaximized }
      isFocused={ props.isFocused }
    >
      <Scrollbars style={{ width: '100%', height: 'calc(100% - 9rem)' }}>
        <TaskDetails>
          <TaskDetailsHead>
            <CheckBox
              // TODO:
              // This is a huge performance bug that will cause issues when rendering multiple lists of data
              // since it will lead to the entire list being updated even if a single change happens. This is
              // completely against the very principle of atomic changes, something that SolidJS represents.
              // 
              // One day, I will gather the strength, the energy, and the mental fortitude to fix problem
              // once and for all.
              // 
              // But today is not that day.
              isDone={ props.tasks.find(task => task.id === props.taskID)?.isDone ?? false }
              onClick={ toggleTaskDone }
            />
            <Switch>
              <Match when={ !editMode() }>
                <Name>{ taskName() }</Name>
                <NameActionButtonWrapper onClick={ onEditClick }><VsEdit color='#E2E2E2' style={{ 'font-size': '1rem' }} /></NameActionButtonWrapper>
              </Match>
              <Match when={ editMode() }>
              <NameInput
                ref={ nameInputRef }
                type='text'
                placeholder='name'
                value={ taskName() }
                onInput={ e => setTaskName(e.currentTarget.value) }
                onKeyDown={ e => e.key === 'Enter' && updateTaskName() }
              />
              <NameActionButtonWrapper onClick={ () => updateTaskName() }><VsCheck color='#E2E2E2' style={{ 'font-size': '1rem' }} /></NameActionButtonWrapper>
              </Match>
            </Switch>
          </TaskDetailsHead>
          <TaskDetailsBody>
            <DescriptionTextArea
              placeholder='Write a description..'
              onInput={
                e => {
                  setTaskDescription(e.currentTarget.value)
                  updateTaskDescription()
                }
              }
            />
          </TaskDetailsBody>
          <TaskMetaDetails>
            <TagsInput
              addNewTag={ addNewTaskTag }
              input={ currentTagText() }
              setInput={ setCurrentTagText }
            />
          </TaskMetaDetails>
          <For each={ task()?.tags ?? [] }>
            {
              tag => (
                <TagComponent
                  deleteTag={ deleteTaskTag }
                  id={ tag.id }
                  text={ tag.text }
                />
              )
            }
          </For>
          {/* <SubTasks></SubTasks> */}
        </TaskDetails>
      </Scrollbars>
    </Wrapper>
  )
}


// Exports:
export default TaskTab
