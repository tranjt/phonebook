import React, { useState, useEffect } from 'react'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import ErrorMessage from './components/ErrorMessage'
import phonebookService from './services/phonebook'

const App = () => {
  const [personFilter, setPersonFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState({ text: null, classname: '' })

  useEffect(() => {
    phonebookService.getAll()
      .then(initialPhonebook => setPersons(initialPhonebook))
  }, [])

  const displayErrorMessage = (text, errorType) => {
    setErrorMessage({ text, classname: errorType })
    setTimeout(() => {
      setErrorMessage({ text: null, classname: '' })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const tempPerson = persons.find(person =>
      person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())

    if (tempPerson === undefined) {
      const newPerson = { name: newName, number: newNumber }
      phonebookService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          displayErrorMessage(`Added ${returnedPerson.name}`, 'success')
        })
        .catch(error => {
          displayErrorMessage(error.response.data.error, 'error')
        })

    } else {
      if (window.confirm(`${newName} is already added in phonebook, replace old number with new one?`)) {
        phonebookService.update({ ...tempPerson, number: newNumber })
          .then(reponse => {
            setPersons(persons.map(person => person.id !== tempPerson.id ? person : reponse))
          })
          .catch(error => {
            if (error.response.data.error) {
              displayErrorMessage(error.response.data.error, 'error')
            } else {
              displayErrorMessage(`Information of ${tempPerson.name} has already been removed from server`, 'error')
              setPersons(persons.filter(person => person.id !== tempPerson.id))
            }
          })
      }
    }
  }

  const deletePerson = (delPerson) => {
    return () => {
      if (window.confirm(`Delete ${delPerson.name}?`)) {
        phonebookService.remove(delPerson.id)
        const newPersons = persons.filter(person => person.id !== delPerson.id)
        setPersons(newPersons)
      }
    }
  }

  let filteredPersons = persons.filter(person =>
    person.name.toLocaleLowerCase().includes(personFilter.toLocaleLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage} />
      <PersonFilter
        personFilter={personFilter}
        setPersonFilter={setPersonFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App