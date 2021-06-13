import * as React from 'react';
import {
    Input,
    Button,
    List
} from 'antd'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as todoActions from '../../store/action/todo'
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.css'


class TodoList2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputVal: ''
        }
    }

    componentDidMount() {
        const { todoActions: { initTodo } } = this.props 
        axios.get('https://www.fastmock.site/mock/5ad6a64440cf81301e4fb4b0adbd4b5b/base/todoList')
            .then(res => {
                const { code, data } = res.data || {}
                if (code) {
                    initTodo(data)
                }
            })
    }

    handleChange = (e) => {
        const inputVal = e?.target?.value || ''
        this.setState({
            inputVal
        })
    }

    render() {
        const { todoList, todoActions: { addTodo, delTodo } } = this.props 
        return (
            <div className="todo-list">
                <div className="search-wrapper">
                    <Input
                        placeholder='please enter'
                        style={{ width: '250px' }}
                        value={this.state.inputVal} 
                        onChange={this.handleChange}/>
                    <Button type="primary" onClick={() => addTodo(this.state.inputVal)}>Add</Button>
                </div>

                <div className="list-wrapper">
                    <List 
                        bordered 
                        dataSource={todoList}
                        renderItem={(item, idx) => (
                            <List.Item onClick={() => delTodo(idx)}>{idx}: {item}</List.Item>
                        )}
                        />
                </div>
            </div>
        );
    };
};
const mapStateToProps = (state, props) => {
    return {
        todoList: state.todo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoActions: bindActionCreators(todoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList2)