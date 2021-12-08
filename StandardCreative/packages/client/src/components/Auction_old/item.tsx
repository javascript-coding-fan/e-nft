import React, { useState } from 'react'
import './style.scss'
import { RightImage } from './images'

const Item = (props) => {
  const { handleclick } = props
  return (
    <>
      <img onClick={() => handleclick()} src={RightImage} />
    </>
  )
}

export default Item
