import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($password: String!, $email: String, $username: String) {
    login(password: $password, email: $email, username: $username) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput) {
    saveBook(input: $input) {
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
mutation removeBook($input: BookInput) {
    removeBook(input: $input) {
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