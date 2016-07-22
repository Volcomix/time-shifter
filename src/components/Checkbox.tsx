import * as React from 'react'

interface Props {
    id: string
    checked: boolean
    onChange: (newChecked: boolean) => void
}

export default class Checkbox extends React.Component<Props, {}> {
    
    render() {
        return (
            <label
                className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'
                htmlFor={this.props.id}
            >
                <input
                    className='mdl-checkbox__input'
                    type='checkbox'
                    id={this.props.id}
                    checked={this.props.checked || false}
                    onChange={this.onChange}
                />
            </label>
        )
    }
    
    private onChange = (event: React.FormEvent) => {
        const input = event.target as HTMLInputElement
        this.props.onChange(input.checked)
    }
}