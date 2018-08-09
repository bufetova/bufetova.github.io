import React from 'react'
import './App.css'

class App extends React.Component {

  state = {
    contactInputValue: "",
    contacts: []
  };

  handleSubmit = event => {
    event.preventDefault ()

    this.setState({
      contacts: this.state.contacts.concat({
        id: Date.now().toString(32),
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email
        }
      )
    })
  }

componentDidMount() {
  fetch("http://localhost:3000/contacts")
    .then(response => response.json())
    .then(contacts => this.setState({contacts})

    )
}

  render() {

    return (
      <div className="App">
        <h1>Contact List</h1>
        <form onSubmit={this.handleSubmit}>

          <input type="text" name="firstName" value={this.state.contacts.contactInputValue}
           onChange={(event) => this.setState({
             firstName: event.currentTarget.value
           })}/>
          <input type="text" name="lastName" value={this.state.contacts.contactInputValue}
            onChange={(event) => this.setState({
              lastName: event.currentTarget.value
           })}/>
          <input type="text" name="phoneNumber" value={this.state.contacts.contactInputValue}
            onChange={(event) => this.setState({
              phoneNumber: event.currentTarget.value
           })}/>
          <input type="text" name="email" value={this.state.contacts.contactInputValue}
           onChange={(event) => this.setState({
             email: event.currentTarget.value
           })}/>

          <button>Add contact</button>
        </form>
        <ul>
          {this.state.contacts.map(contact => (
              <li key={contact.id}>
                {contact.firstName} {contact.lastName} {contact.phoneNumber} {contact.email}
                <button>Delete</button>
                <button>Edit</button>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default App;
