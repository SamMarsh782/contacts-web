import React from 'react';
import './views.css';

const ItemBar = ({ visible, items, onClick, name, guid, deleteContact, searchRef, deleteable }) => {

  if(visible) {
    return (
      <div className="item-container" onClick={onClick}> 
        {items.map((item, index) => (
          <div key={index} style={{ width: `${(95 / items.length)}%` }}>
            {item.field}: {item.value}
          </div>
        ))}
        {deleteable && (
          <div 
            className="delete-button"
            onClick={(event) => {
              const userConfirmed = window.confirm("Are you sure you want to delete contact: " + name + "?");
              event.stopPropagation();
              if(userConfirmed) {
                deleteContact(name, guid);
              }
              setTimeout(() => {
                searchRef.current.focus();
              }, 300);
            }}
          >X
          </div>
        )}
      </div>
    )
  }
};

export default ItemBar;