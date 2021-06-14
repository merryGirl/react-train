import React, { useState, useCallback, memo, useMemo } from 'react'

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

export {
    UseStateHooc,
    UseCallbackHooc,
    UseMemoParent
}