const listHelper = require('../utils/list_helper')
const mockBlogs = require('../mockBlogs.json')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('returns 0 for empty array', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('returns correct sum', () => {
    const result = listHelper.totalLikes(mockBlogs)
    expect(result).toBe(34)
  })
})

describe('favoriteBlog', () => {
  test('returns undefined for empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('return favorite post', () => {
    const result = listHelper.favoriteBlog(mockBlogs)
    expect(result).toEqual(expect.objectContaining({ title: 'Canonical string reduction', likes: 12 }))
  })
})
