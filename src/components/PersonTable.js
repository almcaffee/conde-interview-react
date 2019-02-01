import React, { Component } from 'react';

export class PersonTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePerson: null,
    };
  }

  // Cancel the active edit
  // Clear the edited person from storage
  cancelEdit = () => {
    localStorage.clear();
    this.setState({ activePerson: null });
  }

  // Change property of stored edited person based on input name
  handleChange = (event) => {
    event.preventDefault();
    let person = this.getEditedPerson();
    person[event.nativeEvent.target.name] = event.nativeEvent.target.value;
    this.setEditedPerson(person);
  }

  // Set state variable to initialize input row render
  // Set person to edit in storage as the active person
  editPerson = (p) => {
    this.setEditedPerson(p);
    this.setState({ activePerson: p });
  }

  // get person from localStorage
  getEditedPerson = () => {
    return JSON.parse(localStorage.getItem('person'));
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
        </React.Fragment>
      );
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
  // Clear active person to de-render input row
  savePerson = () => {
    if(this.props.validatePerson(this.getEditedPerson())) {
      this.props.savePerson(this.getEditedPerson());
      this.setState({ activePerson: null });
    }
  }

  // Store person
  setEditedPerson = (p) => {
    localStorage.setItem('person', JSON.stringify(p));
  }

  render() {

    const { people } = this.props;

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
            people.map((p, i) => (
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
