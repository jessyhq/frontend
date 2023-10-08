// Packages:
import {
  Component,
  Match,
  Switch
} from 'solid-js'


// Typescript:
export interface TopBarProps {
  title: string
  isMaximized: boolean
  isMinimized: boolean
  toggleMaximize: (value: boolean) => void
  toggleMinimize: (value: boolean) => void
}


// Imports:
import {
  VsChromeMinimize,
  VsChromeRestore,
  VsChromeMaximize,
  VsChromeClose
} from 'solid-icons/vs'


// Styles:
import {
  Wrapper,
  Title,
  Buttons,
  Button,
  CloseButton,
} from './styles'


// Functions:
const TopBar: Component<TopBarProps> = (props) => {
  return (
    <Wrapper>
      <Title>{ props.title }</Title>
      <Buttons>
        <Switch>
          <Match when={ props.isMinimized }>
            <Button onClick={ () => props.toggleMinimize(false) }>
              <VsChromeRestore color='#FFFFFF' />
            </Button>
          </Match>
          <Match when={ !props.isMinimized }>
            <Button onClick={ () => props.toggleMinimize(true) }>
              <VsChromeMinimize color='#FFFFFF' />
            </Button>
          </Match>
        </Switch>
        <Switch>
          <Match when={ props.isMaximized }>
            <Button onClick={ () => props.toggleMaximize(false) }>
              <VsChromeRestore color='#FFFFFF' />
            </Button>
          </Match>
          <Match when={ !props.isMaximized }>
            <Button onClick={ () => props.toggleMaximize(true) }>
              <VsChromeMaximize color='#FFFFFF' />
            </Button>
          </Match>
        </Switch>
        <CloseButton style={{ 'padding-right': '0.125rem' }}>
          <VsChromeClose color='#FFFFFF' />
        </CloseButton>
      </Buttons>
    </Wrapper>
  )
}


// Exports:
export default TopBar
