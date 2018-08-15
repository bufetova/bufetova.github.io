import React from 'react'
import EditInputs from './EditInputs.js'
import './App.css'

class App extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    contacts: [],
    showInputs: false
  };

  componentDidMount() {
    this.sync()
  }

  sync = () => {
    fetch("http://localhost:3000/contacts")
      .then(response => response.json())
      .then((contacts) => {
        contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
        this.setState({contacts})
      })
  };

  handleSubmit = event => {
    event.preventDefault ();

    this.setState({
        contacts: this.state.contacts.concat({
        id: Date.now().toString(32),
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email
        }
      )
    });

    fetch("http://localhost:3000/contacts", {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.setState({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    })
   ).then(this.sync)
 };

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
      showInputs: true});
  };


render() {
   return (
      <div className="App">
        <h1>Contact List</h1>
        <form onSubmit={this.handleSubmit}>

          <input name="firstName" value={this.state.firstName} onChange={(event) => this.setState({
            firstName: event.currentTarget.value
          })}/>
          <input name="lastName" value={this.state.lastName} onChange={(event) => this.setState({
            lastName: event.currentTarget.value
          })}/>
          <input name="phoneNumber" value={this.state.phoneNumber} onChange={(event) => this.setState({
            phoneNumber: event.currentTarget.value
          })}/>
          <input name="email" value={this.state.email} onChange={(event) => this.setState({
            email: event.currentTarget.value
          })}/>

          <button>Add contact</button>
        </form>
        <ul>
          {this.state.contacts.map(contact => (
              <li key={contact.id}>
                {contact.firstName} {contact.lastName} {contact.phoneNumber} {contact.email}
                {this.state.showInputs ? <EditInputs/> : null}

                <button onClick={() => this.deleteContact(contact.id)}>Delete</button>
                <button onClick={() => this.editContact(contact.id)}>Edit</button>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default App;
