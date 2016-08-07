import * as React from 'react'
import Paper from 'material-ui/Paper'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import { grey500 } from 'material-ui/styles/colors'

export interface Props {
    order: number
    height: number
    isDragging: boolean
    draggingY: number
    children?: JSX.Element
}

export interface Callbacks {
    onDragStart: React.DragEventHandler
    onDrag: React.DragEventHandler
    onDragEnd: React.DragEventHandler
}

const DraggableItem = ({
    order,
    height,
    isDragging,
    draggingY,
    children,
    onDragStart,
    onDrag,
    onDragEnd
}: Props & Callbacks) => {

    let handle: HTMLDivElement
    let dragTarget: Node

    return (
        <Paper
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                top: isDragging ? draggingY - height / 2 - 10 : order * height,
                left: 0,
                right: 0,
                transition: isDragging ?
                    'all 150ms ease-out, top 1ms linear' :
                    'all 250ms ease-out',
                padding: 10,
                zIndex: isDragging ? 10000 : order,
                backgroundColor: 'white'
            }}
            zDepth={isDragging ? 3 : 1}
            draggable={true}
            onMouseDown={ev => dragTarget = ev.target as Node}
            onDragStart={ev => {
                if (handle.contains(dragTarget)) {
                    ev.dataTransfer.effectAllowed = 'move'

                    // Typescript definition does not declare setDragImage
                    ;(ev.dataTransfer as any).setDragImage(new Image(), 0, 0)
                    
                    // Make it work on Firefox
                    ev.dataTransfer.setData('text/plain', null)

                    onDragStart(ev)
                } else {
                    ev.preventDefault()
                }
            }}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
        >
            <div ref={node => handle = node}>
                <ActionReorder style={{ padding: 12, cursor: 'move' }} color={grey500} />
            </div>
            {children}
        </Paper>
    )
}

export default DraggableItem