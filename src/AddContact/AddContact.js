import React from 'react'
import './AddContact.css'
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
        <p>Enter your data: </p>
        <form onSubmit={this.handleSubmit}>

          <input
            name="firstName"
            placeholder="First name"
            value={this.state.firstName}
            onChange={(event) => this.setState({
              firstName: event.currentTarget.value})}
          />

          <input
            name="lastName"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={(event) => this.setState({
              lastName: event.currentTarget.value})}
          />

          <input
            name="phoneNumber"
            placeholder="Phone number"
            value={this.state.phoneNumber}
            onChange={(event) => this.setState({
              phoneNumber: event.currentTarget.value})}
          />

          <input
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(event) => this.setState({
              email: event.currentTarget.value})}
          />

          <button>Add contact</button>
        </form>
      </React.Fragment>
    )
  }
}

export default AddContact