import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {

  return (
    persons.map(person => <div key={person.name}>
      <Person
        person={person}
        deletePerson={deletePerson(person)} />
    </div>
    )
  )
}

export default Persons
