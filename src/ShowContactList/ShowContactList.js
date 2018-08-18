import React from 'react'
import './ShowContactList.css'
import UpdateContact from '../UpdateContact/UpdateContact.js'


class ShowContactList extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    showInputsForContact: null
  };

  editContact = (contactId) => {
    this.setState({
      showInputsForContact: contactId
    });
  };

  deleteContact = (contactId) => {
    fetch("http://localhost:3000/contacts/" + contactId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(this.props.syncContacts);
  };

  render () {
    const contactList = this.props.getContacts;
    return (
      <ul>
        {contactList.map(contact => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName} {contact.phoneNumber} {contact.email}

            <button onClick={() => this.deleteContact(contact.id)}>Delete</button>
            <button onClick={() => this.editContact(contact.id)}>Edit</button>
            {this.state.showInputsForContact !== contact.id ? null :
              <UpdateContact
                contactId={contact.id}
                syncContacts={this.props.syncContacts}
              />
            }
          </li>
          )
        )}
        </ul>
    )
  }
}

export default ShowContactList