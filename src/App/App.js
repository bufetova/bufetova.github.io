import React from 'react'
import './App.css'
import styled from 'styled-components'
import ShowContactList from '../ShowContactList/ShowContactList.js'
import AddContact from '../AddContact/AddContact.js'

const H1 = styled.h1`
  font-size: 25px;
  margin-left: 15px;
  font-weight: 600;
  font-size: 35px;
  text-align: center;
  
    &:before, &:after {
      content:"";
      width:10px;
      height:10px;
      border-radius:50%;
      background: #b83b3b;
      display:inline-block;
      margin: 5px 15px;
    }
`;

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
        <H1>Contact List</H1>
        <AddContact syncContacts={this.syncContacts} />
        <ShowContactList getContacts={this.state.contacts}
                         syncContacts={this.syncContacts}
        />
      </div>
    );
  }
}

export default App;
