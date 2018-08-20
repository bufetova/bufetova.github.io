import React from 'react'
import './ShowContactList.css'
import styled from 'styled-components'
import UpdateContact from '../UpdateContact/UpdateContact.js'


const Button = styled.button`
  margin-left: 3px;
  border-radius: 3px;
  border: 4px solid white;
  background: #dfcbd4;
  
    &:hover {
      background: #c097aa;
    }
`;

const Li = styled.li`
  list-style-type: circle;
  padding-bottom: 10px;
  
    &:hover {
      font-size: 17px;
    }
`;

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
          <Li key={contact.id}>
            {contact.firstName} {contact.lastName} {contact.phoneNumber} {contact.email}

            <Button onClick={() => this.deleteContact(contact.id)}>Delete</Button>
            <Button onClick={() => this.editContact(contact.id)}>Edit</Button>
            {this.state.showInputsForContact !== contact.id ? null :
              <UpdateContact
                contactId={contact.id}
                syncContacts={this.props.syncContacts}
              />
            }
          </Li>
          )
        )}
        </ul>
    )
  }
}

export default ShowContactList