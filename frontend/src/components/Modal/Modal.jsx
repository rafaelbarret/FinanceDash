import { X } from 'lucide-react'

import './Modal.css'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <h2>Nova transação</h2>

          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal