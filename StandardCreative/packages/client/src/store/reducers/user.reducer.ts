import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constant'

const initialState = {
  walletConnected: false,
  userAddress: '',
  network: '',
  ethBalance: 0
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        walletConnected: true,
        userAddress: action.address,
        network: action.network
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        walletConnected: false,
        userAddress: '',
        network: '',
        ethBalance: 0
      }

    default:
      return state
  }
}

export default userReducer
