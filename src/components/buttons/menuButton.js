import React from 'react';
import './buttons.css';

const MenuButton = ({ label, icon, onClick }) => {
  return (
    <div
      className="menu-button"
      onClick={onClick}
    >
      <div className="menu-button-header">
        <p className="menu-button-header-text">{label}</p>
      </div>
      <div className="menu-button-body">
        <p className="menu-button-body-text">{icon}</p>
      </div>
    </div>
  )
};

export default MenuButton;