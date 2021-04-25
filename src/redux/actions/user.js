import { SET_TOKEN } from '../constant'
import request from '../../utils/request'
export const setToken = (data) => ({ type: SET_TOKEN, data })

export const userLogin = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request({
        url: `/auth-center/web/login/crs/pwdLogin`,
        method: 'post',
        data,
      })
        .then((res) => {
          dispatch(setToken(res.data.TOKEN))
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
