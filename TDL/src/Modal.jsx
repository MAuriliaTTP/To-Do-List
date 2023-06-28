import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    const handleModalClick = (event) => {
      event.stopPropagation();
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={handleModalClick}>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;