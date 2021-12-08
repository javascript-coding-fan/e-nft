import React from 'react'

interface Props {
  children: React.ReactNode
  show: boolean
  closeModal: () => void
  label: string
}

const BaseModal = (props: Props) => {
  const { children, show, closeModal, label } = props

  return (
    <div className={`modal ${show === true ? 'show' : ''}`} id="modal" onClick={closeModal}>
      <div
        className="modal-dialog"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 id="myModalLabel">{label}</h3>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>

      {/* @ts-ignore */}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1050;
          display: none;
          width: 100%;
          height: 100%;
          overflow: hidden;
          outline: 0;
          text-align: center;
          padding: 0 !important;
          background-color: #6c6c6c8f;
          transition: all 0.3s linear;
          visibility: visible;
          opacity: 1;
        }
        .modal.show {
          display: block;
          padding-right: 15px;
        }
        .modal-dialog {
          display: inline-block;
          text-align: left;
          vertical-align: middle;
          max-width: 90%;
          width: 450px;
          margin-top: 120px;
          transition: transform 0.3s ease-out;
          transform: translateY(50px);
        }
        .modal-content {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          pointer-events: auto;
          background-color: #efeded;
          background-clip: padding-box;
          border: 1px solid #ddd;
          outline: 0;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgb(0 0 0 / 25%);
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1rem 1rem;
        }
        .modal-header h3 {
          margin: 0;
          flex: 1 0 100%;
          text-align: left;
          font-size: 23px;
        }
        .modal-header .close {
          text-align: right;
          padding: 1rem;
          margin: -1rem;
          -webkit-box-flex: 0;
          -ms-flex: 0 1 43px;
          flex: 0 1 43px;
          min-width: 0 !important;
          position: absolute;
          top: 13px;
          right: 23px;
          background-color: transparent;
          border: 0;
        }
        .close {
          float: right;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          color: #000;
          text-shadow: 0 1px 0 #fff;
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}
export default BaseModal
