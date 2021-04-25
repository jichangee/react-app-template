import { Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import PassportRoute from "./components/PassportRoute";
import AuthRoute from './components/AuthRoute'
import "moment/locale/zh-cn";
import routeAuthList from "./router/authList";
import routeList from "./router/list";
import "./App.less";
moment.locale("zh-cn");

function App(props) {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
        <Switch>
          {routeList.map((route) => (
            <PassportRoute
              key={route.path}
              {...route}
              user={props.user}
            ></PassportRoute>
          ))}
        </Switch>
        {props.user.token ? (
          <div className="App-main">
            <Switch>
              {/* 登录过的路由组件 */}
              {routeAuthList.map((route) => (
                <AuthRoute
                  key={route.path}
                  {...route}
                  user={props.user}
                ></AuthRoute>
              ))}
            </Switch>
          </div>
        ) : (
          <Redirect to="/passport/login"></Redirect>
        )}
      </ConfigProvider>
    </div>
  );
}

export default connect((state) => ({ user: state.user }))(App);
