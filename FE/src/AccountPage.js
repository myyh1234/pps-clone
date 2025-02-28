import { Navigate } from "react-router";
import { useState, useContext } from "react";
import { LoginContext } from "./Login";
import { fetchJson } from "./myFetch";

export default function AccountPage() {
  const [newPassword, setNewPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const { loginState } = useContext(LoginContext)

  console.log(loginState)
  if (!loginState)
    return <Navigate to='/login' />

  async function modifyPassword(){
    if (newPassword !== passwordCheck){
      alert('비밀번호를 다시 확인해 주세요.')
      return
    }
    try {
      const result = await fetchJson('/modifyPassword', { newPassword })
      const data = await result.json()
      if (result.ok)
        alert('비밀번호 수정 완료')
      else
        alert('수정 실패: ' + data.error) // 에러 코드 자세히 적기
    }
    catch (err) {
      console.error(err)
      alert('수정 실패: ')
    }
  }

  const Form = <div>
    <div>
        <label htmlFor='username'>새 비밀번호: </label>
        <input type='password' name='username' required onChange={(e) => setNewPassword(e.target.value)}></input>
    </div>
    <div>
        <label htmlFor='password'>새 비밀번호 확인: </label>
        <input type='password' name='password' required onChange={(e) => setPasswordCheck(e.target.value)}></input>
    </div>
    <button onClick={modifyPassword}>비밀번호 수정</button>
  </div>

  return Form
}