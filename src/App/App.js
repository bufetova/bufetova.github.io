import React from 'react'
import './App.css'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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

const Div = styled.div`
text-align: center;
`

const StyledLink = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: #b83b3b;
    
    &:hover {
      font-weight: 600;
    }
`;

const P = styled.p`
    font-size: 17px;
    padding-top: 20px;
    text-align: center;
    line-height: 30px;
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
     <Router>
      <div className="App">
        <H1>Contact List</H1>
        <Div>
          <StyledLink to="/">Main Page</StyledLink>
          <StyledLink to="/addContact">Add Contact</StyledLink>
          <StyledLink to="/showContactList">Contact List</StyledLink>
        </Div>
        <Route exact path="/" render={() => <P> Hello! This is your first React contact list! <br/> Please navigate with the nav bar above :) </P>}/>
        <Route path="/addContact"
               render={() =>
                 <AddContact syncContacts={this.syncContacts} /> }
        />
        <Route path="/showContactList"
               render={() =>
                 <ShowContactList getContacts={this.state.contacts}
                                  syncContacts={this.syncContacts} /> }
        />
      </div>
     </Router>
    );
  }
}

export default App;

