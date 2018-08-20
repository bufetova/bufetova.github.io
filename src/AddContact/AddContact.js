import React from 'react'
import styled from 'styled-components'
import './AddContact.css'

const Input = styled.input`
  border: none;
  border-bottom: 3px solid grey;
  margin-bottom: 30px;
  background: transparent;
  width: 200px;
  height: 30px; 
  margin-left: 15px;
  
    &:focus {
      box-shadow: none;
      outline: none;
      border-color: #c097aa;
      transition: 0.4s ease-in-out;
    }  
`;

const Button = styled.button`
  height:30px;
  margin-left: 10px;
  background-color: light-grey;
  border: 3px solid white;
  
    &:hover {
      background-color: #a6a6a6;
    }
`;

const P = styled.p`
  font-size: 18px;
`;

class AddContact extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    contacts: [],
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
    ).then(this.props.syncContacts)
  };

  render() {
    return (
      <React.Fragment>
        <P>Enter your data:</P>
        <form onSubmit={this.handleSubmit}>

          <Input
            name="firstName"
            placeholder="First name"
            value={this.state.firstName}
            onChange={(event) => this.setState({
              firstName: event.currentTarget.value})}
          />

          <Input
            name="lastName"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={(event) => this.setState({
              lastName: event.currentTarget.value})}
          />

          <Input
            name="phoneNumber"
            placeholder="Phone number"
            value={this.state.phoneNumber}
            onChange={(event) => this.setState({
              phoneNumber: event.currentTarget.value})}
          />

          <Input
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(event) => this.setState({
              email: event.currentTarget.value})}
          />

          <Button>Add contact</Button>
        </form>
      </React.Fragment>
    )
  }
}

export default AddContact