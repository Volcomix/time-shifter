import * as React from 'react'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import { grey500 } from 'material-ui/styles/colors'

interface Props {
    order: number
    height: number
    children?: JSX.Element
}

export interface State {
    isDragging: boolean,
    top: number
}

class DraggableItem extends React.Component<Props, State> {
    private handle: HTMLDivElement
    private dragTarget: Node

    constructor(props: Props) {
        super(props)
        this.state = { isDragging: false, top: -1 }
    }

    render() {
        return (
            <li
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: this.state.isDragging
                        ? this.state.top
                        : this.props.order * this.props.height,
                    left: 0,
                    right: 0,
                    transition: this.state.isDragging ? 'top 1ms' : 'top 250ms',
                    padding: 10
                }}
                draggable={true}
                onMouseDown={ev => this.dragTarget = ev.target as Node}
                onDragStart={ev => {
                    if (this.handle.contains(this.dragTarget)) {
                        ev.dataTransfer.effectAllowed = 'move'

                        // Typescript definition does not declare setDragImage
                        ;(ev.dataTransfer as any).setDragImage(new Image(), 0, 0)
                        
                        // Make it work on Firefox
                        ev.dataTransfer.setData('text/plain', null)

                        this.setState({
                            isDragging: true,
                            top: ev.clientY - this.props.height / 2 - 4
                        })
                    } else {
                        ev.preventDefault()
                    }
                }}
                onDrag={ev => {
                    this.setState({
                        isDragging: true,
                        top: ev.clientY - this.props.height / 2 - 4
                    })
                }}
                onDragEnd={ev =>
                    this.setState({ isDragging: false, top: -1 })
                }
            >
                {this.props.children}
                <div ref={node => this.handle = node}>
                    <ActionReorder style={{ cursor: 'move' }} color={grey500} />
                </div>
            </li>
        )
    }
}

export default DraggableItem