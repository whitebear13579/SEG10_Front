import React from "react";
import "../assets/components/modal.css";
import AddChat from "./AddChat";
import JoinChat from "./JoinChat";
const Modal = ({ isOpen, onClose, children , onAddChat}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <AddChat onAddChat={onAddChat}/>
        <JoinChat />
      </div>
    </div>
  );
};

export default Modal;
