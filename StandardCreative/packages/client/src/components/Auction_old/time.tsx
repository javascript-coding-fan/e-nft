import React, { useState } from 'react'
import './style.scss'

const Time = (props) => {
  return (
    <div className="time">
      <div>TIME REMAINING:</div>
      <div>15:23</div>
      <div>(each bid extends auction 10min)</div>
    </div>
  )
}

export default Time
