import React from 'react'
import './App.css'

class App extends React.Component {

  state = {
    contacts: []
  };

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
        <form>
          <input type="text" />
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
