import React, { useEffect, useState } from 'react';
import './modals.css';

import StandardButton from '../buttons/standardButton';
import Switch from '../binary inputs/switch';

const ExternalModal = ({ visible, name, phone, email, company, companyID, region, emailTrue, textTrue, guid, mode, close, add, edit }) => {

  const [nameInput, setNameInput] = useState(name);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [companyInput, setCompanyInput] = useState(company);
  const [companyIDInput, setCompanyIDInput] = useState(companyID);
  const [regionInput, setRegionInput] = useState(region);
  const [emailTrueInput, setEmailTrueInput] = useState(emailTrue);
  const [textTrueInput, setTextTrueInput] = useState(textTrue);
  
  
  useEffect(() => {
    setNameInput(name);
    setPhoneInput(phone);
    setEmailInput(email);
    setCompanyInput(company);
    setCompanyIDInput(companyID);
    setRegionInput(region);
    setEmailTrueInput(emailTrue);
    setTextTrueInput(textTrue);
  }, [name, phone, email, company, companyID, region, emailTrue, textTrue]);


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
              Email
            </p>
            <div className="modal-row">
              <input 
                className="modal-input"
                type="string"
                placeholder="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <p className="modal-title">
              Company ID
            </p>
            <div className="modal-row">
              <input 
                className="modal-input"
                type="string"
                placeholder="Company ID"
                value={companyIDInput}
                onChange={(e) => setCompanyIDInput(e.target.value)}
              />
            </div>
            <p className="modal-title">
              Company Name
            </p>
            <div className="modal-row">
              <input 
                className="modal-input"
                type="string"
                placeholder="Company Name"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
              />
            </div>
            <p className="modal-title">
              Region
            </p>
            <div className="modal-row">
              <input 
                className="modal-input"
                type="string"
                placeholder="Region"
                value={regionInput}
                onChange={(e) => setRegionInput(e.target.value)}
              />
            </div>
            <p className="modal-title">
              Contact Methods
            </p>
            <div className="modal-row">
              <div className="modal-row-split">
                <p className="modal-text">Text: </p>
                <Switch varTrue={textTrueInput} setVarTrue={setTextTrueInput} />
              </div>
              <div className="modal-row-split">
                <p className="modal-text">Email: </p>
                <Switch varTrue={emailTrueInput} setVarTrue={setEmailTrueInput} />
              </div>
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
                  setEmailInput("");
                  setCompanyIDInput("");
                  setCompanyInput("");
                  setRegionInput("");
                  setEmailTrueInput(false);
                  setTextTrueInput(false);
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
                    success = add(nameInput, phoneInput, emailInput, companyInput, companyIDInput, regionInput, (emailTrueInput ? (textTrueInput ? 'Both' : 'Email') : (textTrueInput ? 'Text (SMS)' : '')));
                  } else {
                    success = edit(nameInput, phoneInput, emailInput, companyInput, companyIDInput, regionInput, (emailTrueInput ? (textTrueInput ? 'Both' : 'Email') : (textTrueInput ? 'Text (SMS)' : '')), guid);
                  }
                  if(success === 0) {
                    setNameInput("");
                    setPhoneInput("");
                    setEmailInput("");
                    setCompanyIDInput("");
                    setCompanyInput("");
                    setRegionInput("");
                    setEmailTrueInput(false);
                    setTextTrueInput(false);
                  }
                }}
              />
            </div>
        </div>
      </div>
    )
  }
};

export default ExternalModal;