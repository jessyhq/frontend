// Packages:
import { Component, JSXElement, createEffect, createSignal } from 'solid-js'
import { styled } from 'solid-styled-components'
import { select as d3Select } from 'd3-selection'
import { transition as d3Transition } from 'd3-transition'
import { line, curveCardinal } from 'd3-shape'


// Typescript:
export interface ScribbleProps {
  text: string
  activate: boolean
  setIsAnimating: (newValue: boolean) => void
  recalculateScribbleWidth: boolean
  scribbleWidthRecalculationCallback: () => void
  children: JSXElement
}


// Styles:
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 73%;
  height: 100%;
  margin: 0 3%;
`

export const LineSVG = styled.svg`
  position: absolute;
  z-index: -1;
  max-width: 67%;
`


// Functions:
d3Select.prototype.transition = d3Transition

// Exports:
class GetWidthOfText {
  c: HTMLCanvasElement | undefined
  ctx: CanvasRenderingContext2D | null
  constructor() {
    this.c = document.createElement('canvas')
    this.ctx = this.c.getContext('2d')
  }
  compute = (text: string, fontName: string, fontSize: string, resolution: number = 5) => {
    if (this.c === undefined) {
      this.c = document.createElement('canvas')
      this.ctx = this.c.getContext('2d')
    } if (this.ctx === null) {
      return 0
    }
    const fontSpec = fontSize + ' ' + fontName
    if (this.ctx.font !== fontSpec) this.ctx.font = fontSpec
    return Math.ceil(this.ctx.measureText(text).width / resolution) * resolution
  }
}

export const getWidthOfText = new GetWidthOfText().compute

const Scribble: Component<ScribbleProps> = (props) => {
  // Ref:
  let middleRef: HTMLDivElement | undefined
  let lineSVGRef: SVGSVGElement | undefined

  // Signals:
  const [ scribble, setScribble ] = createSignal<undefined | any>()
  const [ scribbleDimensions, setScribbleDimensions ] = createSignal({ width: 0, height: 0 })
  const [ scribblePathLength, setScribblePathLength ] = createSignal(0)
  const [ isScribbleDrawn, setIsScribbleDrawn ] = createSignal<{ current: boolean, previous: boolean | undefined }>({ current: false, previous: undefined })

  // Functions:
  const generateScribble = ({ width, height }: { width: number, height: number }) => {
    if (!lineSVGRef) return
    let pathLength: number
    const points: [ number, number ][] =
      [ ...Array( Math.min(width, middleRef?.getBoundingClientRect().width ?? 220) / 5) ].map((_e, i) => [ i * 5, Math.floor(Math.random() * height) ])
    const curve = d3Select(lineSVGRef)
      .selectAll('path')
      .data([points[points.length - 1]])
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', '#E2E2E2')
            .attr('stroke-width', 2.5)
            .attr('shape-rendering', 'geometricPrecision')
            .attr('d', line().curve(curveCardinal)(points))
            .attr('stroke-dasharray', function () {
              setScribblePathLength(this.getTotalLength())
              pathLength = this.getTotalLength()
              return this.getTotalLength()
            })
            .attr('stroke-dashoffset', pathLength)
      )
    setScribble(curve)
  }

  // Effects:
  createEffect(() => {
    if (props.recalculateScribbleWidth) {
      props.scribbleWidthRecalculationCallback()
      const rawScribbleWidth = getWidthOfText(props.text, 'Roboto', `${ 16 + (0.5 * 2) }px`)
      setScribbleDimensions({ width: Math.min(rawScribbleWidth, middleRef?.getBoundingClientRect().width ?? 220), height: 10 })
      if (scribble() !== undefined) scribble().remove()
      generateScribble({ width: Math.min(rawScribbleWidth, middleRef?.getBoundingClientRect().width ?? 220), height: 10 })
    }
  })

  createEffect(() => {
    if (isScribbleDrawn().current === true && isScribbleDrawn().previous === false && props.activate === false && scribble() !== undefined) {
      props.setIsAnimating(true);
      (async () => {
        await scribble()
          .attr('stroke-dashoffset', 0)
          .transition()
          .duration(500)
          .attr('stroke-dashoffset', scribblePathLength)
          .end()
        scribble().remove()
        setIsScribbleDrawn({ current: false, previous: true })
        generateScribble(scribbleDimensions())
        props.setIsAnimating(false)
      })()
    } else if (isScribbleDrawn().current === false && props.activate === true && scribble() !== undefined) {
      props.setIsAnimating(true);
      (async () => {
        await scribble()
          .attr('stroke-dashoffset', scribblePathLength)
          .transition()
          .duration(500)
          .attr('stroke-dashoffset', 0)
          .end()
        setIsScribbleDrawn({ current: true, previous: false })
        props.setIsAnimating(false)
      })()
    }
  })

  // Return:
  return (
    <Wrapper>
      <LineSVG
        ref={ lineSVGRef }
        width={ scribbleDimensions().width + 5 }
        height={ scribbleDimensions().height * 2 }
        viewBox={ `0 0 ${ scribbleDimensions().width - 5 > 0 ? scribbleDimensions().width - 5 : scribbleDimensions().width } ${ scribbleDimensions().height }` }
        preserveAspectRatio='xMidYMid meet'
      />
      { props.children }
    </Wrapper>
  )
}


// Exports:
export default Scribble
