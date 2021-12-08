import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constant'
import { User } from '../state.types'

export const login = (address: string, network: string) => {
  return {
    type: LOGIN_SUCCESS,
    address,
    network
  }
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
