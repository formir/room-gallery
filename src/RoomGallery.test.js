import { render, screen } from '@testing-library/react'
import RoomGallery from './RoomGallery'

test('renders learn react link', () => {
  render(<RoomGallery />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
