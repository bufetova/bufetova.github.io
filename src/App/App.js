import React from 'react'
import './App.css'
import UpdateContact from '../UpdateContact/UpdateContact.js'
import AddContact from '../AddContact/AddContact.js'

class App extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    contacts: [],
    showInputsForContact: null
  };

  syncContacts = () => {
    fetch("http://localhost:3000/contacts")
      .then(response => response.json())
      .then((contacts) => {
        contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
        this.setState({contacts})
      })
  };

  componentDidMount() {
    this.syncContacts()
  }


  //TODO COMPONENTS

  deleteContact = (contactId) => {
    fetch("http://localhost:3000/contacts/" + contactId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== contactId
      )
    })
  };

  editContact = (contactId) => {
    this.setState({
      showInputsForContact: contactId
    });
  };




render() {
   return (
      <div className="App">
        <h1>Contact List</h1>
        <AddContact syncContacts={this.syncContacts} />

        {/*TODO COMPONENTS*/}

        <ul>
          {this.state.contacts.map(contact => (
              <li key={contact.id}>
                {contact.firstName} {contact.lastName} {contact.phoneNumber} {contact.email}

                <button onClick={() => this.deleteContact(contact.id)}>Delete</button>
                <button onClick={() => this.editContact(contact.id)}>Edit</button>
                {this.state.showInputsForContact !== contact.id ? null :
                  <UpdateContact
                    contactId={contact.id}
                    syncContacts={this.syncContacts}
                  />
                }
              </li>
            )
          )}
        </ul>



      </div>
    );
  }
}

export default App;
