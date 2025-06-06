import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      fullName
      email
      avatar
      type
      createdAt
      updatedAt
    }
  }
`;
