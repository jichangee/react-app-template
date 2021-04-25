import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export default function PassportRoute(props) {
  return (
    <>
      {/* 已登录就跳转到首页 */}
      {props.user.token ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Route {...props}></Route>
      )}
    </>
  )
}
