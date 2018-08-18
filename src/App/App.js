import React from 'react'
import './App.css'
import ShowContactList from '../ShowContactList/ShowContactList.js'
import AddContact from '../AddContact/AddContact.js'

class App extends React.Component {

  state = {
    contacts: [],
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

render() {
   return (
      <div className="App">
        <h1>Contact List</h1>
        <AddContact syncContacts={this.syncContacts} />
        <ShowContactList getContacts={this.state.contacts}
                         syncContacts={this.syncContacts}
        />
      </div>
    );
  }
}

export default App;
