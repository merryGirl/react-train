import React from 'react';

export default class Child2 extends React.Component {
    constructor() {
        super()
        this.state = {
            input2: 0
        }
    }

    componentDidMount() {
        this.setState({
            input2: this.props.money
        })
    }

    handleChange() {

    }

    render() {
        return (
            <>
                英文
                <input type="text" value={this.state.input2} onChange={this.handleChange}/>
            </>
        )
    }
}