// 需要有权限的路由

import Home from '../views/Home/index.jsx'

const routeList = [
  {
    path: '/',
    name: '首页',
    component: Home,
    exact: true,
  }
]

export default routeList
