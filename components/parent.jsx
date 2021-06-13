import React from 'react';
import Child1 from './child1'
import Child2 from './child2'

export default class Parent extends React.Component {
    constructor() {
        super();

        this.state = {
            money: 1
        }
    }

    handleMoney() {
        let money = this.state.money;
        this.setState({
            money: money++
        })
    }
    render() {
        return (
            <div>
                parent 组件
                <input type="text" value={this.state.value} onChange={this.handleMoney}/>
                <Child1 money={this.state.money} />
                <Child2 money={this.state.money} />
            </div>
        )
    }
}