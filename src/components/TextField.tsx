import * as React from 'react'

interface Props {
    id: string
    value: string
    onChange: (newValue: string) => void
    label?: string
    type?: string
}

export default class TextField extends React.Component<Props, {}> {
    
    render() {
        return (
            <div className='mdl-textfield mdl-js-textfield'>
                <input
                    className='mdl-textfield__input'
                    id={this.props.id}
                    value={this.props.value || ''}
                    type={this.props.type}
                    onChange={this.onChange}
                />
                <label
                    className='mdl-textfield__label'
                    htmlFor={this.props.id}
                >
                    {this.props.label}
                </label>
            </div>
        )
    }
    
    private onChange = (event: React.FormEvent) => {
        const input = event.target as HTMLInputElement
        this.props.onChange(input.value)
    }
    
    static defaultProps: Props = {
        id: undefined, value: undefined, onChange: undefined,
        label: undefined, type: 'text'
    }
}