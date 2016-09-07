import * as React from 'react'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import { grey900, grey600 } from 'material-ui/styles/colors'

export interface Props {
    order: number
    height: number
    isDeleting: boolean
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

const emptyImage = new Image()

class DraggableItem extends React.Component<Props & Callbacks, {}> {

    private handle: HTMLDivElement
    private dragTarget: Node

    render() {
        const {
            order,
            height,
            isDeleting,
            isDragging,
            draggingY,
            hover,
            children,
            onMouseOver,
            onDragStart,
            onDrag,
            onDragEnd
        } = this.props

        return (
            <li
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'absolute',
                    overflow: 'hidden',
                    top: isDragging ? draggingY - height / 2 - 10 : order * height,
                    left: 0,
                    transition: isDragging ?
                        'all 250ms ease-out, top 1ms linear' :
                        'all 250ms ease-out, width 250ms ease-in',
                    zIndex: isDragging ? 10000 : order + 100,
                    boxShadow: isDragging ? (
                        '0px 10px 30px rgba(0, 0, 0, 0.19), ' +
                        '0px 6px 10px rgba(0, 0, 0, 0.23)'
                    ) : (
                        '0px 6px 5px rgba(0, 0, 0, 0.12), ' +
                        '0px 4px 3px rgba(0, 0, 0, 0.12)'
                    ),
                    backgroundColor: 'white',
                    width: isDeleting ? 0 : '100%'
                }}
                draggable={true}
                onMouseOver={onMouseOver}
                onMouseDown={ev => this.dragTarget = ev.target as Node}
                onDragStart={ev => {
                    if (this.handle.contains(this.dragTarget)) {
                        ev.dataTransfer.effectAllowed = 'move'

                        // Typescript definition does not declare setDragImage
                        ;(ev.dataTransfer as any).setDragImage(emptyImage, 0, 0)
                        
                        // Make it work on Firefox
                        ev.dataTransfer.setData('text/plain', null)

                        onDragStart(ev.pageY)
                    } else {
                        ev.preventDefault()
                    }
                }}
                onDrag={ev => {
                    ev.preventDefault()
                    if (ev.pageY > 0) {
                        onDrag(ev.pageY, Math.floor((ev.pageY - 10) / height))
                    }
                }}
                onDragEnd={onDragEnd}
            >
                <div ref={node => this.handle = node}>
                    <ActionReorder
                        style={{
                            transition: 'initial',
                            visibility: hover ? 'visible' : 'hidden',
                            margin: '12px 4px',
                            cursor: 'move'
                        }}
                        color={grey600}
                        hoverColor={grey900}
                    />
                </div>
                {children}
            </li>
        )
    }
}

export default DraggableItem