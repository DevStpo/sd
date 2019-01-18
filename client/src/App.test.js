import React from 'react'
import { render } from 'react-testing-library'
import TheComponent from './components/TheComponent/TheComponent'

test('renders without crashing', () => {
  render(<TheComponent />)
})
