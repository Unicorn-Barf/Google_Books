import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
    query me {
        me {
            savedBooks {
              authors
              description
              bookId
              image
              link
              title
            }
            bookCount
            username
            _id
            email
          }
    }
`;