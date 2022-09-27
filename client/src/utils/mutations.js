import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($password: String!, $email: String, $username: String) {
    login(password: $password, email: $email, username: $username) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($book: BookInput) {
  saveBook(book: $book) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;