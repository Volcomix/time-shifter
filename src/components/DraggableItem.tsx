import * as React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import { grey500 } from 'material-ui/styles/colors'

export interface Props {
    isDragging: boolean
    y: number
    children?: JSX.Element
}

export interface Callbacks {
    onDragStart: React.DragEventHandler
    onDragEnd: React.DragEventHandler
}

class DraggableItem extends React.Component<Props & Callbacks, {}> {
    private handle: HTMLDivElement
    private dragTarget: Node

    private handleDragStart: React.DragEventHandler = ev => {
        if (this.handle.contains(this.dragTarget)) {
            ev.dataTransfer.effectAllowed = 'move'

            // Typescript definition does not declare setDragImage
            ;(ev.dataTransfer as any).setDragImage(new Image(), 0, 0)
            
            // Make it work on Firefox
            ev.dataTransfer.setData('text/plain', null)

            this.props.onDragStart(ev)
        } else {
            ev.preventDefault()
        }
    }

    render() {
        return (
            <Paper
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: this.props.y,
                    left: 0,
                    right: 0,
                    transition: this.props.isDragging ?
                        'all 150ms ease-out, top 1ms linear' :
                        'all 250ms ease-out',
                    padding: 10,
                    zIndex: this.props.isDragging ? 10000 : this.props.y,
                    backgroundColor: 'white'
                }}
                zDepth={this.props.isDragging ? 3 : 1}
                draggable={true}
                onMouseDown={ev => this.dragTarget = ev.target as Node}
                onDragStart={this.handleDragStart}
                onDragEnd={this.props.onDragEnd}
            >
                <div ref={node => this.handle = node}>
                    <ActionReorder
                        style={{
                            padding: 12,
                            cursor: 'move'
                        }}
                        color={grey500}
                    />
                </div>
                {this.props.children}
            </Paper>
        )
    }
}

export default DraggableItem