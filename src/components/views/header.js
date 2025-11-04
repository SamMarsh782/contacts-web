import React from 'react';
import './views.css';

import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {

  const navigate = useNavigate();

  return (
    <div
      className="header"
    >
      <div className="header-back-button" onClick={() => {navigate(-1)}}>
        <p className="header-back-text">{"<Back"}</p>
      </div>
      <p className="header-text">{title}</p>
    </div>
  )
};

export default Header;