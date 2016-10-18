import React, { Component, PropTypes } from 'react';

class App extends Component {
  onClickDiv(e) {
    console.log('Hello World !!');
  }

  render() {
    return (
      <div onClick={this.onClickDiv}>
        Hello World !
      </div>
    );
  }
}

export default App;
