import React, { useEffect, useState } from 'react';
import './modals.css';

import StandardButton from '../buttons/standardButton';

const InternalModal = ({ visible, name, phone, route, guid, mode, close, add, edit }) => {

  const [nameInput, setNameInput] = useState(name);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [routeInput, setRouteInput] = useState(route);
  
  
  useEffect(() => {
    setNameInput(name);
    setPhoneInput(phone);
    setRouteInput(route);
  }, [name, phone, route]);


  if(visible) {
    return (
      <div className="centered-view">
        <div className="modal-view">
            <p className="modal-title">
              Name
            </p>
            <div className="modal-row">
              <input 
                className="modal-input"
                type="string"
                placeholder="Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <p className="modal-title">
              Phone
            </p>
            <div className="modal-row">
              <span className="modal-input-prefix">+1</span>
              <input 
                className="modal-input"
                type="number"
                placeholder="5555555555"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
            </div>
            <p className="modal-title">
              Route
            </p>
            <div className="modal-row">
              <input 
                className="modal-input"
                type="string"
                placeholder="Route"
                value={routeInput}
                onChange={(e) => setRouteInput(e.target.value)}
              />
            </div>
            <div className="modal-button-view" >
              <StandardButton
                label="Cancel"
                color="#CC0000"
                textColor="#A9936D"
                width="45%"
                onClick={() => {
                  close();
                  setNameInput("");
                  setPhoneInput("");
                  setRouteInput("");
                }}
              />
              <StandardButton
                label="Save"
                color="#485A72"
                textColor="#A9936D"
                width="45%"
                onClick={() => {
                  let success;
                  if (mode) {
                    success = add(nameInput, phoneInput, routeInput);
                  } else {
                    success = edit(nameInput, phoneInput, routeInput, guid);
                  }
                  if(success === 0) {
                    setNameInput("");
                    setPhoneInput("");
                    setRouteInput("");
                  }
                }}
              />
            </div>
        </div>
      </div>
    )
  }
};

export default InternalModal;