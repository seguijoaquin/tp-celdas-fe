import React,  { Component } from 'react';

class NewProject extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
  
    handleSubmit() {
        fetch("http://localhost:9000/croudfound/project/" 
        + this.state.name + "/" + this.state.amount + "/" + this.state.days)
        .then(console.log)
    }

    componentDidMount() {
        
    }

    handleChange = ({target}) => {
        this.setState({[target.name]: target.value})
    }

    render() {
      return (
        <div style={{marginBottom: 2 + 'em'}}>
        <form>
            <input id="name" placeholder="Nombre proyecto" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
            <input id="amount" placeholder="Monto a aportar" type="numeric" min="1" name="amount" value={this.state.amount} onChange={this.handleChange}/>
            <input id="days" placeholder="Dias"type="text" name="numeric" min="1" value={this.state.days} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit()}>Submit</button>
        </form>
        </div>
      );
    }
  }

  export default NewProject;