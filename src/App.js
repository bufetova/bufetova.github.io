import React from 'react'

import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Contact List</h1>
        <form>
          <input type="text" />
          <button>Add contact</button>
        </form>
        <ul>

        </ul>
      </div>
    );
  }
}

export default App;
