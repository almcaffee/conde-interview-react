import React, { Component } from 'react';

export class PersonTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePerson: null
    };
  }

  // Cancel the active edit
  cancelEdit = () => {
    this.setState({ activePerson: null });
  }

  // Dynamically change state variable based on input name
  handleChange = (event) => {
    event.preventDefault();
    let person = this.state.activePerson;
    person[event.nativeEvent.target.name] = event.nativeEvent.target.value;
    this.setState({ activePerson: person });
  }

  // Set state variable to initialize input row render
  editPerson = (p) => {
    this.setState({ activePerson: p });
  }

  // Render row as text or inputs based on active person
  renderRow = (p) => {
    if(this.state.activePerson && this.state.activePerson === p) {
      return (
        <React.Fragment>
          <td>{ p.id }</td>
          <td><input type="text" name="firstName" id="firstName" defaultValue={ p.firstName } onChange={this.handleChange} /></td>
          <td><input type="text" name="lastName" id="lastName" defaultValue={ p.lastName } onChange={this.handleChange} /></td>
          <td><input type="text" name="city" id="city" defaultValue={ p.city } onChange={this.handleChange} /></td>
          <td>
            <button className="btn-save" onClick={this.savePerson}>Save</button>
            <button className="btn-can" onClick={this.cancelEdit}>Cancel</button>
          </td>
        </React.Fragment> );
    } else {
      return (
        <React.Fragment>
          <td>{ p.id }</td>
          <td>{ p.firstName }</td>
          <td>{ p.lastName }</td>
          <td>{ p.city }</td>
          <td>
            <button className="btn-edit" onClick={() => this.editPerson(p)}>Edit</button>
            <button className="btn-del" onClick={() => this.removePerson(p.id)}>Delete</button>
          </td>
        </React.Fragment>
      );
    }
  }

  // Lift state/Call parent function
  removePerson = (id) => {
    this.props.removePerson(id);
  }

  // Lift state/Call parent function
  // clear active person to de-render input row
  savePerson = () => {
    if(this.props.validatePerson(this.state.activePerson)) {
      this.props.savePerson(this.state.activePerson);
      this.setState({ activePerson: null});
    }
  }

  render() {
    return (
      <div className="people-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.people.map((p, i) => (
              <tr key={i}>
                { this.renderRow(p) }
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

 export default PersonTable;
