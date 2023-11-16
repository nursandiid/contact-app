import { capitalizeFirstLetter, capitalizeWords } from '../../src/utils/helpers.js'

it('should be able to convert string to be capitalize at first letter', () => {
  expect(capitalizeFirstLetter('name is empty')).toBe('Name is empty')
  expect(capitalizeFirstLetter('phone is empty')).toBe('Phone is empty')
})

it('should be able to convert string to be capitalize', () => {
  expect(capitalizeWords('name is empty')).toBe('Name Is Empty')
  expect(capitalizeWords('phone is empty')).toBe('Phone Is Empty')
})
