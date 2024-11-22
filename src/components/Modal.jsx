import React from 'react';
import Signin from './Signin'; // Import your Signin component
import StudentUpdate from './StudentUpdate';

const Modal = ({ isOpen, onClose, onLogin}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay inset-0 fixed">
        <Signin onLogin={onLogin} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Modal;