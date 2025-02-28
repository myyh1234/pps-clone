import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { fetchJson } from "./myFetch"
import { LoginContext } from "./Login"

export default function Signup(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const navigate = useNavigate()
  const { loginState } = useContext(LoginContext)

  if (loginState)
    return <Navigate to='/' />

  async function trySignup() {
    if (password !== passwordCheck){
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    try {
      const result = await fetchJson('/signup', { username, password }); 
      if (!result.ok){
        alert(`회원가입 실패: ${result.json().error}`)
        return
      }
      alert(username + ' 회원가입 성공')
      navigate('/login')
    }
    catch (err) {
      console.error(err)
      alert('회원가입 실패: ', err)
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
    <div>
      <label htmlFor='passwordCheck'>비밀번호 확인: </label>
      <input type='password' name='passwordCheck' required onChange={(e) => setPasswordCheck(e.target.value)}></input>
    </div>
    <button onClick={trySignup}>가입</button>
  </div>

  return Form
}