/**
 * 
 * @param {string} words 
 * @returns 
 */
export const capitalizeFirstLetter = (words) => {
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * 
 * @param {string} words 
 */
export const capitalizeWords = (words) => {
  let result = ''
  words.split(' ').forEach(word => {
    result += capitalizeFirstLetter(word) + ' '
  })

  return result.trim(' ')
}