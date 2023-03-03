const { UserList, MovieList } = require('../FakeData')
const _ = require('lodash')

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: (parent, args, context) => {
      return UserList
    },
    user: (parent, { id }, context) => {
      return _.find(UserList, { id: Number(id) })
    },
    // MOVIE RESOLVERS
    movies: (parent, args, context) => {
      return MovieList
    },
    movie: (parent, { name }, context) => {
      return _.find(MovieList, { name })
    },
  },
  User: {
    favoriteMovies: (parent, args, context) => {},
  },
}

module.exports = { resolvers }
