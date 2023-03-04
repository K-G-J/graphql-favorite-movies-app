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
    // specific resolver for field in type
    favoriteMovies: (parent, args, context) => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010,
      )
    },
  },
  Mutation: {
    createUser: (parent, { input }, context) => {
      const lastId = UserList[UserList.length - 1].id
      const user = {
        id: lastId + 1,
        ...input,
      }
      UserList.push(user)
      return user
    },
    updateUsername: (parent, { input }, context) => {
      const { id, newUsername } = input
      let userUpdated
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername
          userUpdated = user
        }
      })
      return userUpdated
    },
    deleteUser: (parent, { id }, context) => {
      return (_.remove(UserList, { id: Number(id) }))[0]
    },
  },
}

module.exports = { resolvers }
