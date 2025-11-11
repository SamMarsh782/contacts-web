import React from 'react';
import './buttons.css';

const StandardButton = ({ width, color, textColor, label, onClick }) => {
  return (
    <div style={{ width:width, backgroundColor:color}}
      className="button"
      onClick={onClick}
    >
      <p style={{color:textColor}} className="button-text">
        {label}
      </p>
    </div>
  )
};

export default StandardButton;