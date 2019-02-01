import React, { Component } from 'react';
import PersonForm from './PersonForm';
import PersonTable from './PersonTable';

const people = [
  { id: 1, firstName: 'Ollie', lastName: 'Tinsley', city: 'Fairfax' },
  { id: 2, firstName: 'Lebron', lastName: 'James', city: 'Anywhere' },
  { id: 3, firstName: 'Bobby', lastName: 'Brown', city: 'Memphis' },
  { id: 4, firstName: 'Stacy', lastName: 'McNeil', city: 'Fairfax' },
  { id: 5, firstName: 'Jimmy', lastName: 'Butler', city: 'Philly' }
];

class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: people,
      activePerson: null,
      addedPeople: people.length
    };
  }

  // Add or replace existing person to array
  savePerson = (person) => {
    let people = this.state.people;
    if(this.validatePerson(person)) {
      if(person.id && this.personExists(person)) {
        people[this.getPersonIndex(person.id)] = person;
        this.setState({ people: people });
      } else {
        let addedPeople = this.state.addedPeople + 1;
        people.push(Object.assign(person, { id: addedPeople }));
        this.setState({ people: people, activePerson: null, addedPeople: addedPeople });
      }
    }
  }

  // Get a person by id
  getPerson = (id) => {
    return this.state.people.find(p=> p.id === id);
  }

  // Get the index on the person in the array
  getPersonIndex = (id) => {
    return this.state.people.findIndex(p=> p.id === id);
  }

  // Check is person is in the array
  personExists = (person) => {
    return !!this.state.people.findIndex(p=> p === person) > -1;
  }

  // Remove person from the array
  removePerson = (id) => {
    let people = this.state.people.filter(p=> p.id !== id);
    this.setState({ people: people });
  }

  // Check if all fields have value
  validatePerson = (person) => {
    return !!(person.firstName && person.lastName && person.city);
  }

  render() {

    return (
      <React.Fragment>
        <PersonForm activePerson={this.state.activePerson} savePerson={this.savePerson} validatePerson={this.validatePerson}></PersonForm>
        <PersonTable people={this.state.people} removePerson={this.removePerson} savePerson={this.savePerson} validatePerson={this.validatePerson}></PersonTable>
      </React.Fragment>
    );
  }
}

export default Person;
