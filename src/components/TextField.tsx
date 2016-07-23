import * as React from 'react'

interface Props {
    id: string
    value: string
    label?: string
    type?: string
    style?: {}
    onChange: (newValue: string) => void
}

export default class TextField extends React.Component<Props, {}> {
    
    render() {
        return (
            <div
                className='mdl-textfield mdl-js-textfield'
                style={this.props.style}
            >
                <input
                    className='mdl-textfield__input'
                    style={{
                        width: '100%',
                        fontSize: 13,
                        height: 24,
                        borderBottom: 0
                    }}
                    id={this.props.id}
                    value={this.props.value || ''}
                    type={this.props.type}
                    onChange={this.onChange}
                    placeholder={this.props.label}
                />
            </div>
        )
    }
    
    private onChange = (event: React.FormEvent) => {
        const input = event.target as HTMLInputElement
        this.props.onChange(input.value)
    }
    
    static defaultProps: Props = {
        id: undefined,
        value: undefined,
        label: undefined,
        type: 'text',
        style: undefined,
        onChange: undefined
    }
}