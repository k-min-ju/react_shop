import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {changeName, increase} from "../store/userSlice.js";
import {changeCount} from "../store/product.js";
import {memo, useMemo, useState} from "react";

// memo함수는 props가 변경될 때만 렌더링함
// react는 부모 컴포넌트가 재 렌더링되면 자식 컴포넌트도 전부 재 렌더링됨.
// 무거운 컴포넌트의 경우 부하의 가능성 있어 memo를 사용하기도 함
let Child = memo(function() {
    console.log('재렌더링')
    return <div>자식임</div>
})

function 함수() {
    return '반복문10억번'
}

function Cart() {
    let result = 함수();
    // useMemo는 컴포넌트 렌더링시 1회만 실행
    // dependency 추가 가능
    // useMemo(() => {return 함수()}, [state])
    let [count, setCount] = useState(0);
    let reduxState = useSelector((state) => state);
    let dispatch = useDispatch();

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={() => { setCount(count+1) }}>+</button>
            <h6>{reduxState.user.name} {reduxState.user.age}의 장바구니</h6>
            <button onClick={() => {dispatch(increase(100))}}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    <Product cart={reduxState} dispatch={dispatch}/>
                </tbody>
            </Table>
        </div>
    )
}

function Product(props) {
    return (
        <>
            {
                props.cart.product.length > 0 ? props.cart.product.map((item, index) =>
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>
                            <button onClick={() => {
                                props.dispatch(changeCount(item.id))
                            }}>
                            +</button>
                        </td>
                    </tr>
                ) : <tr>
                        <td>안녕</td>
                        <td>안녕</td>
                        <td>안녕</td>
                        <td>안녕</td>
                    </tr>
            }
        </>
    )
}

export default Cart