import React, { useState } from 'react'
import hisgory from '../../hisgory'

interface Props {
  closeModal: () => void
}
const CreateAunctionNotifModal = (props: Props) => {
  const handlePage = () => {
    window.location.href = '/auctions'
  }
  return (
    <div className="modal-body">
      <p className="input-wrap">Your aunction is created successfully!</p>
      <p className="input-wrap">
        You can see all the list of the auctions you have created so far in the following page.
      </p>
      <div className="buy-actions">
        <button onClick={handlePage}>Go to the auction list</button>
      </div>
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

export default CreateAunctionNotifModal
