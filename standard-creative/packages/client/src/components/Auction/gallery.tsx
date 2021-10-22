import React, { useState } from 'react'
import './style.scss'
import Item from './item'
import Grid from '@material-ui/core/Grid'
import { LeftImage, CenterImage, RightImage } from './images'

const Gallery = (props) => {
  const { open } = props
  const viewImage = () => {
    console.log('eee')
    open()
  }

  return (
    <div className="gallery">
      <div className="gallery-single">
        <img src={LeftImage} onClick={() => viewImage()} />
      </div>
      <Grid className="gallery-video">
        <img src={CenterImage} />
      </Grid>
      <div className="gallery-multi">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  )
}

export default Gallery
