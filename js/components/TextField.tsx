import * as React from 'react';

export default class TextField extends React.Component<Props, {}> {
    
    render() {
        return (
            <div className='mdl-textfield mdl-js-textfield'>
                <input
                    id={this.props.id} value={this.props.value} type={this.props.type}
                    onChange={this.props.onChange}
                    className='mdl-textfield__input' />
                <label htmlFor={this.props.id} className='mdl-textfield__label'>
                    {this.props.label}
                </label>
            </div>
        );
    }
    
    static defaultProps: Props = {
        id: undefined, value: undefined, onChange: undefined,
        label: undefined, type: 'text'
    };
}

interface Props {
    id: string;
    value: string;
    onChange?: React.FormEventHandler;
    label?: string;
    type?: string;
}