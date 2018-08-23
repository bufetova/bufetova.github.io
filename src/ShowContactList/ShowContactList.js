import React from 'react'
import './ShowContactList.css'
import styled from 'styled-components'
import UpdateContact from '../UpdateContact/UpdateContact.js'


const Button = styled.button`
  margin-left: 3px;
  border-radius: 3px;
  border: 2px solid white;
  background: #dfcbd4;
  transition: 0.5s;
  
    &:hover {
      background: white;
    }
`;

const P = styled.p`
  font-size: 18px;
  font-style: normal;
  margin-left: 30px;
`;

const Li = styled.li`
  list-style-type: circle;
  padding-bottom: 10px;
`;

const Span = styled.span`
    &:hover {
      font-weight: bolder;
      color: #3f3f3f;
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
      <React.Fragment>
      <P> Contacts: </P>
      <ul>
        {contactList.map(contact => (
          <Li key={contact.id}>
            <Span> {contact.firstName} {contact.lastName} {contact.phoneNumber} {contact.email} </Span>

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
      </React.Fragment>
    )
  }
}

export default ShowContactList