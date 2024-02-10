const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((likes, blog) => {return likes + blog.likes}, 0) ?? 0

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.sort((a,b) => b.likes - a.likes)[0]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}