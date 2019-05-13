import { render, fireEvent } from 'react-testing-library'
import React from 'react'
import App from '../example/App'


test('safety-redux', () => {
  const { container, queryByText } = render(<App />)
  const addButton = queryByText(/\+1/)
  const subtractButton = queryByText(/-1/)
  expect(container).toMatchSnapshot()
  expect(queryByText(/Age:/).textContent).toContain('20')
  fireEvent.click(addButton)
  expect(queryByText(/Age:/).textContent).toContain('21')
  fireEvent.click(subtractButton)
  expect(queryByText(/Age:/).textContent).toContain('20')
  fireEvent.click(subtractButton)
  expect(queryByText(/Age:/).textContent).toContain('19')
})
