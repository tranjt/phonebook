import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Person from '../components/Person'


describe('<Person />', () => {
  let component
  const person =
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  }

  const deletePerson = jest.fn()

  beforeEach(() => {
    component = render(
      <Person person={person} deletePerson={deletePerson} />
    )
  })

  test('display a person ', () => {
    expect(component.container).toHaveTextContent('Arto Hellas')

  })

  test('clicking the button delete calls event handler once', () => {
    const button = component.getByText('delete')
    fireEvent.click(button)

    expect(deletePerson.mock.calls).toHaveLength(1)
  })

})