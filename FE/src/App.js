import { Outlet, Link } from 'react-router';
import { useEffect, useState } from 'react'
import { getAccountInfo, logout } from './Login';
import './App.css';

export default function App() {
  const navbar = [
    {name : "홈", url: "/", id: 0},
    {name : "문제", url : "/problemset", id : 1},
    {name : "문제 저장소", url : "/repositoryset", id : 2}
  ];
  return (
    <div className='main'>
      <NavBar content={navbar}/>
      <Outlet />
    </div>
  );
}

function NavBar({ content }){
  const [account, setAccount] = useState(null)
  useEffect(() => {
    try{
      async function updateAccount(){
        const result = await getAccountInfo()
        
        if (result.isLoggedIn)
          setAccount(result.username)
        else
          setAccount(null)
      }
      updateAccount()
    }
    catch (err) {
      console.log(err)
      setAccount(null)
    }
  }, [])

  const ContentList = content.map(({name, url, id}) => 
    <li key={id} className="nav-item">
      <Link to={url}>{name}</Link>
    </li>
  );
  
  const innerSmallLinks = account ? (
    <>
      <Link to={'/user/' + account} className="small-link">{account}</Link>
      {' '}
      <Link to='/mypage' className="small-link">계정 설정</Link>
      {' '}
      <a href='/' onClick={logout} className="small-link">로그아웃</a>
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
