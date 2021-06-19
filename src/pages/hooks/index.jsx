import React, {
    useState,
    useCallback,
    memo,
    useMemo,
    useReducer,
    useEffect,
    useRef,
    useImperativeHandle,
    useLayoutEffect
} from 'react'

function UseStateHooc () {
    // const [countNum, setCountNum] = useState(0)
    const [countNum, setCountNum] = useState(() => {
        return 0
    })
    const [personConfig, setPersonConfig] = useState({name: '小明', age: 18});
    console.log('UseStateHooc 渲染');

    const handleLazyAdd = () => {
        setTimeout(() => {
            setCountNum(countNum+1) // 获取到旧的数值
        }, 2000)
    }

    const lazyFunctionAdd = () => {
        setTimeout(() => {
            setCountNum(num => num+1) // 函数中的形参能狗获取到num最新的值
        }, 2000)
    }

    return (
        <div>
            <h1>hook学习篇========useState</h1>
            <h2>{countNum}</h2>
            <h3>正常加数</h3>
            <button onClick={() => setCountNum(countNum+1)}>+</button>

            <h3>延时2秒加数——非函数式</h3>
            <button onClick={handleLazyAdd}>lazyAdd</button>

            <h3>延时2秒加数——函数式</h3>
            <button onClick={lazyFunctionAdd}>lazyFunctionAdd</button>
            <div>====</div>

            <h2>同学{personConfig.name}: {personConfig.age}</h2>
            <h3>只更新年龄</h3>
            <button onClick={() => setPersonConfig({age: ++personConfig.age})}>年龄+</button>
            <h3>全部更新</h3>
            <button onClick={() => setPersonConfig({...personConfig, age: ++personConfig.age})}>
                name age +
            </button>
            <h3>不更新——传入的引用地址不变</h3>
            <button onClick={() => setPersonConfig(personConfig)}>不变</button>
        </div>
    )
}

let lastNumChange;
let lastAgeChange;
function UseCallbackHooc () {
    const [num, setNum] = useState(0);
    const [age, setAge] = useState(28);
    // 如果不使用useCallback => 每次渲染都生成一个新的函数
    const addNum = useCallback(() => setNum(num + 1), [])
    console.log('num函数未变更：', addNum === lastNumChange)
    lastNumChange = addNum
    
    const addAge = useCallback(() => setAge(age + 1), [age])
    console.log('age函数未变更：', addAge === lastAgeChange)
    lastAgeChange = addAge

    return (
        <>
            <h1>hook学习篇========useCallback</h1>
            <div>{num}: {age}</div>
            <button onClick={addNum}>Add num</button>
            <button onClick={addAge}>Add age</button>
        </>
    )
}

function UseMemoChild (props) {
    console.log('子组件渲染');
    return (
        <>
            <div>子组件{props.childData.count}</div>
            <button onClick={props.handleCount}>count+</button>
        </>
    )
}
const UseMemoChildWithMemo = memo(UseMemoChild)
// const UseMemoChildWithMemo = memo(UseMemoChild, (prevProps, nextProps) => {
//     if (prevProps.count !== nextProps.count) {
//         return false;
//     }
//     return true;
// })
function UseMemoParent () {
    let [count, setCount] = useState(0)
    let [inputVal, setInputVal] = useState('')

    const handleChange = (e) => setInputVal(e.target.value)
    const handleCount = useCallback(() => setCount(++count), [count])
    const childData = useMemo(() => ({count}), [count])

    return (
        <>
            <h1>useMemo===================</h1>
            <input type="text" value={inputVal} onChange={handleChange} />
            <UseMemoChildWithMemo handleCount={handleCount} childData={childData} />
        </>
    )
}

// useReducer 案例
const initState = { num: 1 }
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const reducer = function(state, action) {
    switch(action.type) {
        case INCREMENT: 
            return { num: state.num + 1 }
        case DECREMENT: 
            return { num: state.num - 1 }
        default:
            return state
    }
}
function UseReducerHook () {
    const [ state, dispatch ] = useReducer(reducer, initState)
    return (
        <>
            <h1>useReducer===================</h1>
            <div>
                <div>{state.num}</div>
                <button onClick={() => dispatch({type: INCREMENT})}>增加</button>
                <button onClick={() => dispatch({type: DECREMENT})}>减少</button>
            </div>
        </>
    )
}

// useState 是 useReducer的语法糖
function MyUseState(initState) {
    const reducer = useCallback(function(state, action) {
        return action
    })
    const [ state, dispatch ] = useReducer(reducer, initState)
    function setState(action) {
        dispatch(action)
    }
    return [ state, setState]

}
function MyUseStateHook() {
    const [numConfig, setNumConfig] = MyUseState({num: 0})
    return (
        <>
            <h1>自己写的useState=================</h1>
            <div>
                <div>{numConfig.num}</div>
                <button onClick={() => setNumConfig({ num: numConfig.num + 1 })}>增加</button>
                <button onClick={() => setNumConfig({ num: numConfig.num - 1 })}>减少</button>
            </div>
        </>
    )
}

function HideUseEffectHook() {
    const [show, setShow] = useState(true)
    return (
        <>
            <h1>useEffect 调用==============</h1>
            <button onClick={() => setShow(!show)}>{!show ? '显示' : '隐藏'}</button>
            {show && <UseEffectHook /> }
        </>
    )
}

function UseEffectHook() {
    const [num, setNum] = useState(0)
    useEffect(() => {
        let timer = setInterval(() => {
            // console.log('每秒一次');
            setNum(x => x + 1)
        }, 1000)

        // 销毁定时器，避免内存泄漏
        return () => {
            console.log('销毁定时器');
            clearInterval(timer)
        }
    }, [])

    return (
        <>
            <h1>useEffect=================</h1>
            <button
                onClick={() => setNum(num + 1)}>
                {num}+
            </button>
        </>
    )
}


const RefChild = React.forwardRef((props, ref) => {
    const childRef = useRef()
    useImperativeHandle(ref, () => ({
        focus: () => childRef.current.focus()
    }))
    return (
        <div>
            <input ref={childRef} type="text" />
            <button onClick={props.getFocus}>焦点</button>
        </div>
    )
})
function UseRefParent() {
    let [number, setNumber] = useState(0)
    let inputRef = React.useRef()
    function getFocus() {
        inputRef.current.focus()
    } 

    return (
        <div>
            <h1>useRef===========================</h1>
            <RefChild ref={inputRef} getFocus={getFocus} />
            {number}
            <button onClick={() => setNumber(x => x + 1)}>+</button>
        </div>
    )
}


function LayoutEffectHook() {
    useLayoutEffect(() => {
        console.log('layoutEffect执行')
    })
    useEffect(() => {
        console.log('effect执行');
    })
    return (
        <div>
            <h1>useLayoutEffect==================</h1>

        </div>
    )
}

// 自定义hooks
const logReducer = (state = [], action) => {
    switch(action.type) {
        case 'add':
            return { num: state.num + 1 }
            break;
        case 'del':
            return { num: state.num - 1 }
            break;
        default: 
            return state
    }
}
// redux中间件，用新的dispatch替代老的dispatch
function useLogger (reducer, initState) {
    let [state, dispatch] = useReducer(reducer, initState)
    function loggerDispatch(action) {
        console.log(state)
        dispatch(action)
    }
    useEffect(() => console.log('新的状态值', state))
    return [state, loggerDispatch]
}
function UseLoggerHook () {
    let [state, dispatch] = useLogger(logReducer, {num: 1})
    return (
        <div>
            <h1>useLogger=================</h1>
            <div>{state.num}</div>
            <button onClick={() => dispatch({type: 'add'})}>+</button>
            <button onClick={() => dispatch({type: 'del'})}>-</button>
        </div>
    )
}

export {
    UseStateHooc,
    UseCallbackHooc,
    UseMemoParent,
    UseReducerHook,
    MyUseStateHook,
    HideUseEffectHook,
    UseRefParent,
    LayoutEffectHook,
    UseLoggerHook
}