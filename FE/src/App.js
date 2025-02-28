import { Outlet, Link, useNavigate } from 'react-router';
import { useContext, useState } from 'react'
import { getAccountInfo, logout, LoginContext } from './Login';
import './App.css';

export default function App() {
  const [loginState, setLoginState] = useState(null)

  const accountInfo = getAccountInfo()
  if (accountInfo.isLoggedIn && !loginState){
    setLoginState(accountInfo.username)
  }
  // return <div>ㅁㄴㅇㄹ</div>

  function setLogin(accountInfo) {
    console.log(accountInfo)
    localStorage.setItem("PPSACCOUNT", JSON.stringify(accountInfo))
    setLoginState(accountInfo.username)
  }

  function setLogout() {
    localStorage.removeItem("PPSACCOUNT")
    setLoginState(null)
  }
  
  const navbar = [
    {name : "홈", url: "/", id: 0},
    {name : "문제", url : "/problemset", id : 1},
    {name : "문제 저장소", url : "/repositoryset", id : 2}
  ];
  return (
    <LoginContext.Provider value={{ loginState, setLogin, setLogout }}>
      <div className='main'>
        <NavBar content={navbar}/>
        <Outlet />
      </div>
    </LoginContext.Provider>
  );
}

function NavBar({ content }){
  const { loginState, setLogout } = useContext(LoginContext)
  const navigate = useNavigate()

  const ContentList = content.map(({name, url, id}) => 
    <li key={id} className="nav-item">
      <Link to={url}>{name}</Link>
    </li>
  );
  
  const innerSmallLinks = loginState ? (
    <>
      <Link to={'/user/' + loginState} className="small-link">{loginState}</Link>
      {' '}
      <Link to='/account' className="small-link">계정 설정</Link>
      {' '}
      <a href='/' onClick={() => logout(setLogout, navigate)} className="small-link">로그아웃</a>
    </>
  ) : (
    <>
      <Link to="/login" className="small-link">로그인</Link>
      {' '}
      <Link to="/signup" className="small-link">회원가입</Link>
    </>
  )
  return (
    <nav className='navbar'>
      <ul className='nav-ul'>
        {ContentList}
      </ul>
      <div className='small-link-container'>
        {innerSmallLinks}
      </div>
    </nav>
  );
}

export function Main(){
  return (
    <main>
      <div>메인페이지</div>
      <div>메인메인</div>
    </main>
  );
}
