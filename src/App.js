import './App.css';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import main_bg from './img/main_bg.webp';
import {createContext, lazy, useEffect, useState, Suspense} from "react";
import data from './data.js';
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import DetailPage from './routes/Detail.js';
import styled from 'styled-components';
import axios from "axios";
import {useQuery} from "react-query";

// lazy를 사용하면 필요할 때 import함
// 사이트 발행할 때도 별도의 js로 발행 함
// 단점 : 컴포넌트 접근 시 로딩 시간이 존재하여 백색 화면을 볼 수도 있음. <Suspense>태그로 로딩바 생성
// react는 발행할 때 하나의 javascript로 생성이 됨. 그래서 실제로 로딩이 늦음.
const Cart = lazy(() => import('./routes/Cart.js'))

let YellowBtn = styled.button`
    background: ${ props => props.bg };
    color: ${ props => props.bg == 'blue' ? 'white' : 'black' };
    padding: 10px;
`

export let Context1 = createContext();

function App() {

    useEffect(() => {
        if(localStorage.getItem('watched') == null || localStorage.getItem('watched') == '') {
            localStorage.setItem('watched', JSON.stringify([]));
        }
    }, []);

    let [shoes, setShoes] = useState(data);
    let [stock, setStock] = useState([10, 11, 12]);

    let navigate = useNavigate();

    let result = useQuery('query', () =>
        axios.get('https://codingapple1.github.io/userdata.json').then
        ((a) => {
            console.log('요청')
            return a.data
        }), {staleTime : 2000}
    );



  return (
    <div className="App">
        <YellowBtn bg='blue'>버튼</YellowBtn>
        <YellowBtn bg='orange'>버튼</YellowBtn>
      {/*<Button variant="primary">Primary</Button>{' '}*/}
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">ROAIN</Navbar.Brand>
                <Nav className="me-auto">
                    {/*<Link className="Nav Link" to="/">홈</Link>
                    <Link className="Nav Link" to="/Outer">Outer</Link>
                    <Link className="Nav Link" to="/Top">Top</Link>
                    <Link className="Nav Link" to="/Shirts">Shirts</Link>
                    <Link className="Nav Link" to="/Bottom">Bottom</Link>
                    <Link className="Nav Link" to="/Shoes">Shoes</Link>
                    <Link className="Nav Link" to="/Detail">Detail</Link>*/}
                    <Nav.Link onClick={ () => {navigate('/outer')}}>outer</Nav.Link>
                    <Nav.Link onClick={ () => {navigate('/top')}}>top</Nav.Link>
                    <Nav.Link onClick={ () => {navigate('/event')}}>event</Nav.Link>
                    {/*<Nav.Link onClick={ () => {navigate('/shoes')}}>shoes</Nav.Link>*/}
                    {/*<Nav.Link onClick={ () => {navigate('/detail')}}>detail</Nav.Link>*/}
                    <Nav.Link onClick={ () => {navigate('/about')}}>about</Nav.Link>
                    <Nav.Link onClick={ () => {navigate('/cart')}}>cart</Nav.Link>
                    {/*<Nav.Link href="/Outer">Outer</Nav.Link>
                    <Nav.Link href="/Top">Top</Nav.Link>
                    <Nav.Link href="/Shirts">Shirts</Nav.Link>
                    <Nav.Link href="/Bottom">Bottom</Nav.Link>
                    <Nav.Link href="/Shoes">Shoes</Nav.Link>*/}
                </Nav>
                <Nav className="ms-auto" style={ {color: 'grey'} }>
                    { result.isLoading && '로딩중' }
                    { result.error && '에러남' }
                    { result.data && result.data.name }
                </Nav>
            </Container>
        </Navbar>
        
        <br/>

        <Suspense fallback={<div>로딩중임</div>}>
            <Routes>
                <Route path="/" element={<Product1 product={shoes} setProduct={setShoes}/>} />
                <Route path="/outer" element={<div>상세보기</div>} />
                <Route path="/top" element={<div>어바웃페이지임</div>} />
                <Route path="/event" element={<Event />}>
                    <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
                    <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
                </Route>
                <Route path="/detail/:id" element={
                    <Context1.Provider value={{stock, shoes}}>
                        <DetailPage shoes={shoes}/>
                    </Context1.Provider>
                } />
                <Route path="/about" element={<About />}>
                    <Route path="member" element={<div>멤버임</div>} />
                    <Route path="location" element={<div>위치정보임</div>} />
                </Route>

                <Route path="/cart" element={<Cart />} />

                {/*<Route path="/about/member" element={<About />} />*/}
                {/*<Route path="/about/location" element={<About />} />*/}
                <Route path="*" element={<div>404페이지</div>} />
            </Routes>
        </Suspense>

        

        {/*<Container>*/}
        {/*    <Row>*/}
        {/*        <Col>*/}
        {/*            /!* 리액트 public 폴더 안에 존재하는 img사용 시 권장코드 *!/*/}
        {/*            /!*<img src={process.env.PUBLIC_URL + '/logo512.png'} width="80%"/>*!/*/}
        {/*            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"/>*/}
        {/*            <h4>{shoes[0].title}</h4>*/}
        {/*            <p>{shoes[0].price}</p>*/}
        {/*        </Col>*/}
        {/*        <Col>*/}
        {/*            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>*/}
        {/*            <h4>{shoes[1].title}</h4>*/}
        {/*            <p>{shoes[1].price}</p>*/}
        {/*        </Col>*/}
        {/*        <Col>*/}
        {/*            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>*/}
        {/*            <h4>{shoes[2].title}</h4>*/}
        {/*            <p>{shoes[2].price}</p>*/}
        {/*        </Col>*/}
        {/*    </Row>*/}
        {/*</Container>*/}
    </div>
  );

  function Product1(props) {
      return (
          <>
              <div className="main-bg" style={{backgroundImage: 'url(' + main_bg + ')'}}/>
              <button onClick={() => {
                  let product = [...props.product];
                  product.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
                         .map((item, index) => {
                             item.id = index;
                         });
                  props.setProduct(product);
              }}>정렬
              </button>

              <Container>
                  <Row>
                      {
                          props.product.map((item, index) => {
                              return (
                                  <Col key={index}>
                                      <img src={item.url} onClick={ () => { navigate('/detail/' + item.id); } } width="80%" style={{cursor: "pointer"}}/>
                                      <h4>{item.title}</h4>
                                      <p>{item.price}</p>
                                  </Col>
                              )
                          })
                      }
                  </Row>
              </Container>

              <button onClick={() => {
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                      .then((result) => {
                          for(let i=0; i<result.data.length; i++) {
                              if(result.data[i].url == null) {
                                  result.data[i].url = "";
                              }
                          }
                          /*
                          let axiosData = props.product.concat(result.data);
                          props.setProduct(axiosData);
                          */
                          let axiosData = [...props.product, ...result.data];
                          props.setProduct(axiosData);
                      })
                      .catch(() => {
                          alert("실패");
                      })

                  // 2개 이상 데이터 요청 시..
                  /*
                    Promise.all([axios.get(''), axios.get('')])
                      .then(() => {

                      })
                  */
              }}>ajax버튼</button>
          </>
      );
  }
  
  function About() {
      return (
          <div>
              <h4>
                  오늘의 어바웃
                  <Outlet></Outlet>
              </h4>
          </div>
      )
  }

    function Event() {
        return (
            <div>
                <h4>
                    오늘의 이벤트
                    <Outlet></Outlet>
                </h4>
            </div>
        )
    }
}

export default App;
