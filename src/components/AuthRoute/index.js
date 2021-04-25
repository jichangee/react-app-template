/**
 * 权限路由组件
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function AuthRoute(props) {
  return (
    <>
      {/* 登陆后才能进入 */}
      {props.user.token ? (
        <Route {...props}></Route>
      ) : (
        <Redirect to="/passport/login"></Redirect>
      )}
    </>
  )
}
