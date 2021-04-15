import React from 'react'

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          id='newName'
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input
          id='newNumber'
          value={newNumber}
          onChange={handleNumberChange} />
      </div>
      <div>
        <button
          type='submit'
          id='addPerson'
        >add</button>
      </div>
    </form>
  )
}

export default PersonForm