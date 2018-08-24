import React from 'react'
import './UpdateContact.css'
import styled from 'styled-components'


const Input = styled.input`
  border: none;
  border-bottom: 3px solid grey;
  margin-bottom: 15px;
  background: transparent;
  width: 200px;
  height: 30px; 
  margin-left: 5px;
  
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
  transition: 0.5s;
  font-weight: bolder;
  
    &:hover {
      background-color: #a6a6a6;
    }
`;

class UpdateContact extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    contacts: []
  };

updateContact = (event) => {
  event.preventDefault();

  this.setState({
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    phoneNumber: this.state.phoneNumber,
    email: this.state.email
  });

  fetch("http://localhost:3000/contacts/" + this.props.contactId, {
    method: "PATCH",
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
      email: "",
    })
  ).then(this.props.syncContacts)
};

  render () {
    return (
      <div>
        <form onSubmit={this.updateContact}>
            <Input
              className="edit-input"
              name="firstName"
              placeholder="First name"
              value={this.state.firstName}
              onChange={(event) => this.setState({
              firstName: event.currentTarget.value})}
            />

            <Input
              className="edit-input"
              name="lastName"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(event) => this.setState({
              lastName: event.currentTarget.value})}
            />

            <Input
              className="edit-input"
              name="phoneNumber"
              placeholder="Phone number"
              value={this.state.phoneNumber}
              onChange={(event) => this.setState({
              phoneNumber: event.currentTarget.value})}
            />

            <Input
              className="edit-input"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(event) => this.setState({
              email: event.currentTarget.value})}
            />

            <Button>Save</Button>
        </form>
      </div>
    )}
}

export default UpdateContact