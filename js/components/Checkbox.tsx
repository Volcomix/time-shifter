import * as React from 'react';

export default class Checkbox extends React.Component<Props, {}> {
    
    render() {
        return (
            <label
                className={
                    'mdl-checkbox mdl-js-checkbox ' +
                    'mdl-js-ripple-effect'
                }
                htmlFor={this.props.id}>
                <input
                    type='checkbox' id={this.props.id}
                    className='mdl-checkbox__input'
                    checked={this.props.checked || false}
                    onChange={this.onChange} />
            </label>
        );
    }
    
    private onChange = (event: React.FormEvent) => {
        let input = event.target as HTMLInputElement;
        this.props.onChange(input.checked);
    }
}

interface Props {
    id: string;
    checked: boolean;
    onChange: (newChecked: boolean) => void;
}