import * as React from 'react'
import Paper from 'material-ui/Paper'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import { grey500 } from 'material-ui/styles/colors'

export interface Props {
    order: number
    height: number
    isDragging: boolean
    draggingY: number
    hover: boolean
    children?: JSX.Element
}

export interface Callbacks {
    onMouseOver: React.MouseEventHandler
    onDragStart: (y: number) => void
    onDrag: (y: number, position: number) => void
    onDragEnd: React.DragEventHandler
}

const DraggableItem = ({
    order,
    height,
    isDragging,
    draggingY,
    hover,
    children,
    onMouseOver,
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
                padding: '10px 0px',
                zIndex: isDragging ? 10000 : order,
                backgroundColor: 'white'
            }}
            zDepth={isDragging ? 2 : 1}
            draggable={true}
            onMouseOver={onMouseOver}
            onMouseDown={ev => dragTarget = ev.target as Node}
            onDragStart={ev => {
                if (handle.contains(dragTarget)) {
                    ev.dataTransfer.effectAllowed = 'move'

                    // Typescript definition does not declare setDragImage
                    ;(ev.dataTransfer as any).setDragImage(new Image(), 0, 0)
                    
                    // Make it work on Firefox
                    ev.dataTransfer.setData('text/plain', null)

                    onDragStart(ev.pageY)
                } else {
                    ev.preventDefault()
                }
            }}
            onDrag={ev => {
                onDrag(ev.pageY, Math.floor((ev.pageY - 10) / height))
            }}
            onDragEnd={onDragEnd}
        >
            <div ref={node => handle = node}>
                <ActionReorder
                    style={{
                        transition: 'initial',
                        visibility: hover ? 'visible' : 'hidden',
                        margin: 12,
                        cursor: 'move'
                    }}
                    color={grey500}
                />
            </div>
            {children}
        </Paper>
    )
}

export default DraggableItem