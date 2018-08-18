import React from 'react'
import './UpdateContact.css'


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
            <input
              className="edit-input"
              name="firstName"
              placeholder="First name"
              value={this.state.firstName}
              onChange={(event) => this.setState({
              firstName: event.currentTarget.value})}
            />

            <input
              className="edit-input"
              name="lastName"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={(event) => this.setState({
              lastName: event.currentTarget.value})}
            />

            <input
              className="edit-input"
              name="phoneNumber"
              placeholder="Phone number"
              value={this.state.phoneNumber}
              onChange={(event) => this.setState({
              phoneNumber: event.currentTarget.value})}
            />

            <input
              className="edit-input"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(event) => this.setState({
              email: event.currentTarget.value})}
            />

            <button>Save</button>
        </form>
      </div>
    )}
}

export default UpdateContact