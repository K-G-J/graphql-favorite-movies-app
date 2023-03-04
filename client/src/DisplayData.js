import React, { useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client'

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`

const QUERY_ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      name
    }
  }
`

const GET_MOVIE_BY_NAME = gql`
  query getMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`

export default function DisplayData() {
  const [movieSearched, setMovieSearched] = useState('')
  // Creater User States
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState('')

  const { data, loading, refetch, error } = useQuery(QUERY_ALL_USERS)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
  // name of function, what to fetch from data
  const [
    fetchMovie,
    { data: movieSearchedData, error: movieError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME)

  const [createUser] = useMutation(CREATE_USER_MUTATION)

  if (loading) {
    return <h1> DATA IS LOADING... </h1>
  }
  if (error) {
    console.log(error)
  }
  if (movieError) {
    console.log(movieError)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          type="button"
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age, nationality },
              },
            })

            refetch()
          }}
        >
          {' '}
          Creater User{' '}
        </button>
      </div>
      {data &&
        data.users.map((user, index) => (
          <div key={index}>
            <h1>Name: {user.name}</h1>
            <h1>Username: {user.username}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Nationality: {user.nationality}</h1>
          </div>
        ))}
      {movieData &&
        movieData.movies.map((movie, index) => (
          <h1 key={index}>Movie Name: {movie.name}</h1>
        ))}
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>Movie Name: {movieSearchedData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && <h1> There was an error fetching the data </h1>}
        </div>
      </div>
    </div>
  )
}
