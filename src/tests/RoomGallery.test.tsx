import { render } from '@testing-library/react'
import RoomGallery from './../RoomGallery'

test('render', () => {
  render(<RoomGallery fetchUrl='/data.json' />)
})
