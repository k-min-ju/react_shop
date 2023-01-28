import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {Context1} from '../App.js';
import {useDispatch, useSelector} from "react-redux";
import {addList} from "../store/product";

function Detail(props) {

    let [count, setCount] = useState(0);
    let {id} = useParams();
    // let viewProduct = props.shoes.find( (item) => item.id == id);
    let [sail, setSail] = useState(true);
    let [numberInput, setNumberInput] = useState();
    let [tab, setTab] = useState(0);
    let [detailFade, setDetailFade] = useState(0);
    let reduxState = useSelector((state) => state);
    let dispatch = useDispatch();
    let findProduct = props.shoes.find(x => x.id == id);

    // 렌더링이 모두 끝난 후 실행됨.
    // dependency정의하지 않으면 재렌더링마다 실행
    // dependency추가했을 때 mount시 추가한 state가 변할 때 실행됨
    // dependency에 []로 두면 최초 1회만 실행되고 더 이상 실행되지 않음
    useEffect(() => {
        let a = setTimeout( () => { setSail(false); }, 2000);
        let b = setTimeout(() => {
            setDetailFade('end');
        });

        let watched = JSON.parse(localStorage.getItem('watched'));
        watched.push(findProduct.id);
        watched = new Set(watched);
        watched = Array.from(watched);
        localStorage.setItem('watched', JSON.stringify(watched));

        // useEffect실행되기 전에 실행
        // clean up function이라고 지칭
        // unmount시 1회 코드 실행하고 싶을 때
        return () => {
            clearTimeout(a);
            clearTimeout(b);
            setDetailFade('');
        };

    }, []);

    return(
        <div className={`container start ${detailFade}`}>
            {
                sail ? <Sail></Sail> : null
            }
            <button onClick={ () => {setCount(count+1)} }>버튼{count}</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={props.shoes[id].url} width="100%" />
                </div>
                <InputNumber value={numberInput}/>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}원</p>
                    {/*<button className="btn btn-danger" onClick={ () => {order(reduxState.product, props.shoes[id])}}>주문하기</button>*/}
                    <button className="btn btn-danger" onClick={ () => {dispatch(addList(props.shoes[id]))} }>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} shoes={props.shoes}/>

        </div>
    )
}

function TabContent(props) {

    let [fade, setFade] = useState();
    let context = useContext(Context1);

    // end클래스를 지웠다가 추가해줘야 애니메이션이 적용됨
    // react 18버전 이상부터 automatic batching기능 추가
    // 기존에는 setState마다 렌더링이 일어났지만 18버전부터 state를 여러번 수정해도 마지막에 한 번만 렌더링이 일어남
    // setFade를 ''후 'end'하면 'end'값으로 렌더링이 발생하여 애니메이션이 적용되지 않음. 시간차가 필요하며 setTimeout 적용
    useEffect(() => {
        let timeOut = setTimeout(() => {
            setFade('end');
        }, 100);
        return () => {
            clearTimeout(timeOut);
            setFade('');
        }
    }, [props.tab]);

    return (
        <div className={`start ${fade}`}>
            {[<div>{props.shoes[0].title}</div>, <div>{props.shoes[1].title}</div>, <div>{props.shoes[2].title}</div>][props.tab]}
        </div>
    )

    /*
    if(props.tab == 0) {
            <div>내용0</div>
        )
    }
    else if(props.tab == 1) {
        return (
            <div>내용1</div>
        )
    }
    else if(props.tab == 2) {
        return (
            <div>내용2</div>
        )
    }
    */
}

function Sail() {
    return (
        <div className="alert alert-warning">
            2초이내 구매시 할인
        </div>
    )
}

const InputNumber = (props) => {
    let [value, setValue] = useState(props.value);

    useEffect(() => {
        numberCheck(value);
    }, [value])

    const onChange = (e) => {
        numberCheck(e.target.value);
    }

    const numberCheck = (v) => {
        let num = v || 0;

        if (!isFinite(num)) {
            alert("한글 입력 불가");
            return;
        }

        num = num.toString();

        if(num != '0' && !num.includes('.')) {
            num = num.replace(/^0+/,'');
        }

        setValue(num);
    }

    return (
        <input type='text' value={value || ''} onChange={onChange}/>
    )
}

export default Detail;