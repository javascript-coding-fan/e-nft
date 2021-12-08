import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import wallet from '../../../utils/wallet'
import { WalletTypes, StoreageKey } from '../../../utils'
import { MetaMask, WalletConnect } from '../images'
import './styles.scss'

const ControlPan = (props) => {
  const { show, handleClose, handleLogin } = props
  const [address, setAddress] = useState('')

  const loginMetamask = async (selectedWallet) => {
    handleClose()
    handleLogin(false)
    // await wallet.setProvider(selectedWallet);
    // await wallet.login(selectedWallet);
    // localStorage.setItem(StoreageKey.walletType, selectedWallet.toString());
  }

  return (
    <div className={show ? 'modal show' : 'modal fade'}>
      <div className="modal-body">
        <img src={MetaMask} onClick={() => loginMetamask(WalletTypes.metamask)} alt="metamask" />
        <img src={WalletConnect} onClick={() => loginMetamask(WalletTypes.walletConnect)} alt="connectwallet" />
      </div>
    </div>
  )
}

export default ControlPan
