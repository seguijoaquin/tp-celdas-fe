import React,  { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import "react-table/react-table.css";
import NewProject from './NewProject';

// import react table
import ReactTable from "react-table";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showOptions: false,
      };
  }

  componentWillMount() {
      this.setState({showOptions:false});
      this.getColumns();
      this.updateData();
  }

  getColumns() {
    this.setState( {
      columns: [{
        Header: 'Nombre',
        accessor: 'name'
      },{
        Header: 'Fecha Inicio',
        accessor: 'creationDate'
      },{
        Header: 'Fecha Fin',
        accessor: 'endDate'
      },{
        Header: 'Monto Requerido',
        accessor: 'ammount'
      },{
        Header: 'Monto Obtenido',
        accessor: 'ammountContributed'
      },{
        Header: 'Estado',
        accessor: 'state'
      },{
        Header: 'Aportar',
        accessor: 'contribute',
        Cell: props => <button onClick={e => this.handleContribute(props, e.target.value)}>Contribuir!</button>
      },{
        Header: 'Verificar',
        accessor: 'verify',
        Cell: props => <button onClick={e => this.handleVerification(props, e.target.value)}>Verificar!</button>
    }]
    })
  }

  handleVerification(e, row) {
    fetch("http://localhost:9000/croudfound/verify/" + e.index)
    .then(this.updateData())
  }

  handleContribute(e, row) {
    var ammount = prompt("Ingrese cantidad:", "0");
    if (ammount !== null && ammount !== "") {
      fetch("http://localhost:9000/croudfound/contribute/" + e.index + "/" + ammount)
      .then(this.updateData())
    } 
  }

  toggleCreation(event) {
    const show = this.state.showOptions
    this.setState({showOptions:!show});
  }

  updateData() {
    fetch("http://localhost:9000/croudfound/projects")
      .then(res => res.json())
      .then(res => {this.setState({data: res.data})})
  }

  render() {
    return (
      <div style={{marginRight: 2 + 'em', marginLeft: 2 + 'em', marginTop: 2 + 'em'}}>
        <header>
          <h4>Lista de proyectos:</h4>
        </header>
        <button onClick={e => this.toggleCreation()} style={{marginBottom: 2 + 'em'}}>Crear proyecto!</button>
        {this.state.showOptions && <NewProject/>}
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
          defaultPageSize = {15}
          pageSizeOptions = {[5, 10, 15]}
        />
      </div>
    );
  }
}

export default App;