import React, { useState } from 'react'
import hisgory from '../../hisgory'

interface Props {
  closeModal: () => void
}
const WaittingModal = (props: Props) => {
  const handlePage = () => {
    window.location.href = '/auctions'
  }
  return (
    <div className="modal-body">
      <p className="input-wrap">Please be patient. creating auction.....</p>
      {/* @ts-ignore */}
      <style jsx>{`
        .modal-body {
          position: relative;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
          padding: 1rem;
        }
        p {
          color: #222;
          font-size: 18px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

export default WaittingModal
