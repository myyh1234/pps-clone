import './Login.css'
import { useState } from 'react'

export async function getAccountInfo(){
  const result = await fetch('http://localhost:4000/logincheck', { credentials: 'include' })
  return result.json()
}

export async function logout() {
  try{
    const result = (await fetch('http://localhost:4000/logout', { credentials: 'include' })).json()
    console.log(result) 
  }
  catch (err) {
    console.error(err)
  }
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const tryLogin = async () => {
    try{
      const res = await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
        credentials: 'include'
      })

      const data = await res.json()
      
      if (res.status === 401) 
        alert('로그인 실패: ' + data.error)
      else {
        alert(`${username} 로그인 성공`)
        window.location.href = '/';
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