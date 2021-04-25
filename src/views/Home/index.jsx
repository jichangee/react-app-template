import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
export default function Home() {
  const history = useHistory()
  const handleLogin = () => {
    history.push('/login')
  }
  return (
    <div className="passport-login-container">
      登录
      <p className="example">123</p>
    </div>
  )
}
