import React from 'react';

export default class Child1 extends React.Component {
    constructor() {
        super()
        this.state = {
            input1: 0
        }
    }

    componentDidMount() {
        this.setState({
            input1: this.props.money * 7
        })
    }

    handleChange() {

    }

    render() {
        return (
            <>
                中文
                <input type="text" value={this.state.input1} onChange={this.handleChange}/>
            </>
        )
    }
}