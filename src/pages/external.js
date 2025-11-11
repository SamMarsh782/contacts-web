import './pages.css';

import { useEffect, useRef, useState } from 'react';

import { getExternalContacts } from '../utils/apis/getExternalContacts.tsx';
import { addExternalContact } from '../utils/apis/addExternalContact.tsx';
import { editExternalContact } from '../utils/apis/editExternalContact.tsx';
import { deleteExternalContact } from '../utils/apis/deleteExternalContact.tsx';

import Header from '../components/divs/header.js';
import ItemBar from '../components/divs/itemBar.js';
import ExternalModal from '../components/modals/externalModal.js';

function External() {

  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedCompID, setSelectedCompID] = useState("");
  const [selectedCompName, setSelectedCompName] = useState("");
  const [selectedEmailTF, setSelectedEmailTF] = useState("");
  const [selectedRegID, setSelectedRegID] = useState("");
  const [selectedGuid, setSelectedGuid] = useState("");
  const [addMode, setAddMode] = useState(true);
  const searchInputRef = useRef(null);

  async function fetchContacts() {
    getExternalContacts()
      .then((contacts) => {
        setContacts(contacts);
        setFilteredSuggestions(contacts);
      })
      .catch((error) => {
        setSaving(false);
        console.error('Error fetching contacts:', error.message);
      })
      .finally(() => {
        setLoading(false);
        setSaving(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  async function addContact(name, phone, email, company, companyID, region, email_T_F) {
    if(!name) {
      window.alert("Name is required for contacts!");
      return 1;
    }
    if((email_T_F === 'Both' || email_T_F === 'Text (SMS)') && !phone) {
      window.alert("Texting is selected but no phone number is provided!");
      return 1;
    }
    if(phone.length > 0 && phone.length !== 10) {
      window.alert("Must enter a valid phone number! Ex: 1234567890");
      return 1;
    }
    if((email_T_F === 'Both' || email_T_F === 'Email') && !email) {
      window.alert("Email is selected but no amail address is provided!");
      return 1;
    }
    if(!companyID) {
      window.alert("Company ID is required for contacts!");
      return 1;
    }
    closeModal();
    setSaving(true);
    await addExternalContact(name, `+1${phone}`, email, companyID, company, region, email_T_F);
    fetchContacts();
    return 0;
  }

  async function editContact(name, phone, email, company, companyID, region, email_T_F, guid) {
    if(!name) {
      window.alert("Name is required for contacts!");
      return 1;
    }
    if((email_T_F === 'Both' || email_T_F === 'Text (SMS)') && !phone) {
      window.alert("Texting is selected but no phone number is provided!");
      return 1;
    }
    if(phone.length > 0 && phone.length !== 10) {
      window.alert("Must enter a valid phone number! Ex: 1234567890");
      return 1;
    }
    if((email_T_F === 'Both' || email_T_F === 'Email') && !email) {
      window.alert("Email is selected but no amail address is provided!");
      return 1;
    }
    if(!companyID) {
      window.alert("Company ID is required for contacts!");
      return 1;
    }
    closeModal();
    setSaving(true);
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.GUID === guid
          ? { ...contact, Person_Name: name, Person_Phone: phone.length > 0 ? `+1${phone}` : "", Person_Email: email, Company_ID: companyID, Company_Name: company, REGION_ID: region, Email_T_F: email_T_F }
          : contact
      )
    );
    console.log(contacts);
    console.log(guid);
    await editExternalContact(guid, name, phone.length > 0 ? `+1${phone}` : "", email, companyID, company, region, email_T_F);
    setSaving(false);
    return 0;
  }

  async function deleteContact(name, guid) {
    setSaving(true);
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.GUID !== guid)
    );
    setFilteredSuggestions(prevContacts =>
      prevContacts.filter(contact => contact.GUID !== guid)
    );
    await deleteExternalContact(name, guid);
    setSaving(false);
  };

  const closeModal = () => {
    console.log("Closing");
    setModalVisible(false);
    setSelectedName("");
    setSelectedPhone("");
    setSelectedEmail("");
    setSelectedCompID("");
    setSelectedCompName("");
    setSelectedEmailTF("");
    setSelectedRegID("");
    setSelectedGuid("");
  };

  useEffect(() => {
    setFilteredSuggestions(
      contacts.filter(item =>
        item.Person_Name.toLowerCase().includes(search.toLowerCase()) ||
        item.Person_Phone?.toString().includes(search) ||
        item.Person_Email?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [contacts, search]);

  if(loading) {
    return (
      <div className="background">
        <Header title="External Contacts" />
        <div className="body">
          <p>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="background">
      <ExternalModal
        visible={modalVisible}
        name={selectedName || ""}
        phone={selectedPhone?.slice(-10) || ""}
        email={selectedEmail || ""}
        company={selectedCompName || ""}
        companyID={selectedCompID || ""}
        region={selectedRegID}
        textTrue={selectedEmailTF === "Text (SMS)" || selectedEmailTF === "Both" ? true : false}
        emailTrue={selectedEmailTF === "Email" || selectedEmailTF === "Both" ? true : false}
        guid={selectedGuid || ""}
        mode={addMode}
        close={closeModal}
        add={addContact}
        edit={editContact}
      />
      <Header title="External Contacts" />
      <div className="body">
        {saving && <p className="saving-indicator">Saving...</p>}
        <div className="search-container">
          <div className="search-bar">
            <input
              ref={searchInputRef}
              className="search-input"
              type="string"
              placeholder="Name, Phone #, or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setFocused(false);
                }, 100);
              }}
            />
          </div>
          <div className="search-results-container">
            {filteredSuggestions.map((contact, index) => (
              <ItemBar
                key={index}
                onClick={() => {
                  setFocused(false);
                  setModalVisible(false);
                  setSelectedName(contact.Person_Name);
                  setSelectedPhone(contact.Person_Phone);
                  setSelectedEmail(contact.Person_Email);
                  setSelectedCompID(contact.Company_ID);
                  setSelectedCompName(contact.Company_Name);
                  setSelectedEmailTF(contact.Email_T_F);
                  setSelectedRegID(contact.REGION_ID);
                  setSelectedGuid(contact.GUID);
                  setSearch("");
                  setModalVisible(true);
                  setAddMode(false);
                }}
                items={[
                  {"field":"Name", "value":contact.Person_Name},
                  {"field":"Phone", "value":contact.Person_Phone},
                  {"field":"Email", "value":contact.Person_Email}
                ]}
                visible={focused}
                name={contact.Person_Name}
                guid={contact.GUID}
                deleteContact={deleteContact}
                searchRef={searchInputRef}
                setFocused={setFocused}
                deleteable={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default External;
