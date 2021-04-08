import React from 'react'

const PersonFilter = ({ personFilter, setPersonFilter }) => {
  const handleFilterChange = (event) => setPersonFilter(event.target.value)

  return (
    <div>
      filter show with <input
        value={personFilter}
        onChange={handleFilterChange} />
    </div>
  )
}

export default PersonFilter