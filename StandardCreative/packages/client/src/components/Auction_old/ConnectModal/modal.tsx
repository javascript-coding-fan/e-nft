import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { MetaMask, WalletConnect } from '../images'
import './styles.scss'

const ControlPan = (props) => {
  const { show } = props
  console.log(show)
  const [address, setAddress] = useState('')

  const loginMetamask = async (type) => {
    switch (type) {
      case 'metamask':
        if (window.ethereum) {
          try {
            const addressArray = await window.ethereum.request({
              method: 'eth_requestAccounts'
            })

            if (addressArray) {
              setAddress(addressArray[0])
            }
          } catch (e) {
            console.log('denied', e)
          }
        } else {
          alert('You have to install MetaMask !')
        }

        break

      case 'connectwallet':
        if (window.ethereum) {
          try {
            const accounts = await window.web3.currentProvider.enable()
            console.log('accounts', accounts)

            const chainIdWalletConnect = await window.web3.eth.getChainId()

            if (accounts.length) {
              const address = accounts[0]
              setAddress(address)
            } else {
              throw new Error('No account found')
            }
          } catch (e) {
            console.log('denied', e)
          }
        } else {
          alert('You have to install MetaMask !')
        }

        break

      default:
        break
    }
  }

  useEffect(() => {}, [])
  return (
    <div className={show ? 'modal show' : 'modal fade'}>
      <div className="modal-body">
        <img src={MetaMask} onClick={() => loginMetamask('metamask')} alt="metamask" />
        <img src={WalletConnect} onClick={() => loginMetamask('connectwallet')} alt="connectwallet" />
      </div>
    </div>
  )
}

export default ControlPan
