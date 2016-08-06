import * as React from 'react'
import Paper from 'material-ui/Paper'
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
            <Paper
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: this.state.isDragging
                        ? this.state.top
                        : this.props.order * this.props.height,
                    left: 0,
                    right: 0,
                    transition: this.state.isDragging ?
                        'all 1ms linear' :
                        'all 250ms ease-out',
                    padding: 10,
                    zIndex: this.state.isDragging ? 20 : 0
                }}
                zDepth={this.state.isDragging ? 3 : 1}
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
                            top: ev.pageY - this.props.height / 2 - 5
                        })
                    } else {
                        ev.preventDefault()
                    }
                }}
                onDrag={ev => {
                    this.setState({
                        isDragging: true,
                        top: ev.pageY - this.props.height / 2 - 5
                    })
                }}
                onDragEnd={ev =>
                    this.setState({ isDragging: false, top: -1 })
                }
            >
                <div ref={node => this.handle = node}>
                    <ActionReorder style={{
                        padding: 12,
                        cursor: 'move'
                    }} color={grey500} />
                </div>
                {this.props.children}
            </Paper>
        )
    }
}

export default DraggableItem