import React, { Component } from 'react';

export class PersonForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      person: {
        id: null,
        firstName: null,
        lastName: null,
        city: null
      }
    }
  }

  // Dynamically change state variable based on input name
  handleChange = (event) => {
    event.preventDefault();
    let person = this.state.person;
    person[event.nativeEvent.target.name] = event.nativeEvent.target.value;
    this.setState({ person: person });
  }

  // Lift state/Call parent function
  savePerson = (event) => {
    event.preventDefault();
    if(this.props.validatePerson(this.state.person)) {
      this.props.savePerson(this.state.person);
      document.getElementById('person-info').reset();
    }
  }

  render() {
    return (
      <div className="person-form">
        <form id="person-info" className="person-info" onSubmit={this.savePerson}>
          <div>
            <label for="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
          </div>
          <div>
            <label for="city">City</label>
            <input type="text" name="city" id="city" onChange={this.handleChange} />
          </div>
          <div className="submit-btn">
            <button type="submit" id="submit-btn" className={ !this.props.validatePerson(this.state.person) ? 'btn-disabled' : '' } disabled={!this.props.validatePerson(this.state.person)}>Add Person</button>
          </div>
        </form>
      </div>
    )
  }
}

 export default PersonForm;
