import './Login.css'
import { useEffect, useState, createContext, useContext } from 'react'
import { fetchJson } from './myFetch'
import { Navigate, useNavigate } from 'react-router'

export const LoginContext = createContext(null)

export function getAccountInfo(){
  if (!localStorage.getItem('PPSACCOUNT')) 
    return { isLoggedIn: false }
  const result = JSON.parse(localStorage.getItem('PPSACCOUNT'))
  result.isLoggedIn = true
  return result
}

export async function logout(setLogout, navigate) {
  console.log('logout')
  try{
    const res = await fetch('http://localhost:4000/logout')
    const data = await res.json()
    // console.log(data)
    if (res.ok){
      setLogout()
      navigate('/')
    }
    else {
      alert('로그아웃 실패: ' + data.error)
    }
  }
  catch (err) {
    console.error(err)
  }
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { loginState, setLogin } = useContext(LoginContext)

  if (loginState)
    return <Navigate to='/' />

  const tryLogin = async () => {
    try{
      const res = await fetchJson('/login', { username, password })
      const data = await res.json()
    
      if (res.ok) {
        alert(`${username} 로그인 성공`)
        setLogin({ username })
        navigate('/')
      }
      else {
        alert('로그인 실패: ' + data.error)
      }
    } catch (err) {
      console.log(err)
      alert('로그인 실패: ', err)
    }
  }

  const Form = <div>
    <div>
        <label htmlFor='username'>아이디: </label>
        <input type='text' name='username' required onChange={(e) => setUsername(e.target.value)}></input>
    </div>
    <div>
        <label htmlFor='password'>비밀번호: </label>
        <input type='password' name='password' required onChange={(e) => setPassword(e.target.value)}></input>
    </div>
    <button onClick={tryLogin}>로그인</button>
  </div>
  
  return Form
}