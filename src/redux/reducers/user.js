import { SET_TOKEN } from '../constant'

const initState = {
  token: '12',
}
export default function createPerson(perState = initState, action) {
  const { type, data } = action
  switch (type) {
    case SET_TOKEN:
      return { ...perState, token: data }
    default:
      return perState
  }
}
