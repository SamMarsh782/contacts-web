import './pages.css';

import { useEffect, useRef, useState } from 'react';

import { getInternalContacts } from '../utils/apis/getInternalContacts.tsx';
import { addInternalContact } from '../utils/apis/addInternalContact.tsx';
import { editInternalContact } from '../utils/apis/editInternalContact.tsx';
import { deleteInternalContact } from '../utils/apis/deleteInternalContact.tsx';

import Header from '../components/divs/header.js';
import ItemBar from '../components/divs/itemBar.js';
import InternalModal from '../components/modals/internalModal.js';

function Internal() {

  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedGuid, setSelectedGuid] = useState("");
  const [addMode, setAddMode] = useState(true);
  const searchInputRef = useRef(null);

  async function fetchContacts() {
    getInternalContacts()
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

  async function addContact(name, phone, route) {
    if(!name) {
      window.alert("Name is required for contacts!");
      return 1;
    }
    if(!phone) {
      window.alert("Phone number is required for contacts!");
      return 1;
    }
    if(phone.length !== 10) {
      window.alert("Must enter a valid phone number! Ex: 1234567890");
      return 1;
    }
    if(!route) {
      window.alert("Route is required for contacts!");
      return 1;
    }
    if(route.length !== 4) {
      window.alert("Route ID must be 4 characters!");
      return 1;
    }
    closeModal();
    setSaving(true);
    await addInternalContact(name, `+1${phone}`, route);
    fetchContacts();
    return 0;
  }

  async function editContact(name, phone, route, guid) {
    if(!name) {
      window.alert("Name is required for contacts!");
      return 1;
    }
    if(!phone) {
      window.alert("Phone number is required for contacts!");
      return 1;
    }
    if(phone.length !== 10) {
      window.alert("Phone number must be 10 digits!");
      return 1;
    }
    if(!route) {
      window.alert("Route is required for contacts!");
      return 1;
    }
    if(route.length !== 4) {
      window.alert("Route ID must be 4 characters!");
      return 1;
    }
    closeModal();
    setSaving(true);
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.GUID === guid
          ? { ...contact, Person_Name: name, Person_Phone: `+1${phone}`, Route_ID: route }
          : contact
      )
    );
    console.log(contacts);
    console.log(guid);
    await editInternalContact(guid, name, `+1${phone}`, route);
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
    await deleteInternalContact(name, guid);
    setSaving(false);
  };

  const closeModal = () => {
    console.log("Closing");
    setModalVisible(false);
    setSelectedName("");
    setSelectedPhone("");
    setSelectedRoute("");
    setSelectedGuid("");
  };

  useEffect(() => {
    setFilteredSuggestions(
      contacts.filter(item =>
        item.Person_Name.toLowerCase().includes(search.toLowerCase()) ||
        item.Person_Phone?.toString().includes(search) ||
        item.Route_ID?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [contacts, search]);

  if(loading) {
    return (
      <div className="background">
        <Header title="Internal Contacts" />
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
      <InternalModal
        visible={modalVisible}
        name={selectedName || ""}
        phone={selectedPhone?.slice(-10) || ""}
        route={selectedRoute || ""}
        guid={selectedGuid || ""}
        mode={addMode}
        close={closeModal}
        add={addContact}
        edit={editContact}
      />
      <Header title="Internal Contacts" />
      <div className="body">
        {saving && <p className="saving-indicator">Saving...</p>}
        <button className="add-button" onClick={() => {
          setAddMode(true);
          setModalVisible(true);
        }}>Add New Contact</button>
        <div className="search-container">
          <div className="search-bar">
            <input
              ref={searchInputRef}
              className="search-input"
              type="string"
              placeholder="Name, Phone #, or Route ID"
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
                  setSelectedRoute(contact.Route_ID);
                  setSelectedGuid(contact.GUID);
                  setSearch("");
                  setModalVisible(true);
                  setAddMode(false);
                }}
                items={[
                  {"field":"Name", "value":contact.Person_Name},
                  {"field":"Phone", "value":contact.Person_Phone},
                  {"field":"Route", "value":contact.Route_ID}
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

export default Internal;
