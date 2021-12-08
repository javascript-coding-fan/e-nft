import React, { useState } from 'react'
import './style.scss'
import { LeftImage, CloseIcon } from './images'

const ImageViewer = (props) => {
  const { show, close } = props
  const closeviewer = () => {
    close()
  }
  return (
    <div className="img-viewer">
      <img src={CloseIcon} onClick={() => closeviewer()} />
      <img src={LeftImage} />
    </div>
  )
}

export default ImageViewer
