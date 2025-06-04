import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query getTasks {
    tasks(input: {}) {
      id
      name
      pointEstimate
      position

      assignee {
        id
        fullName
        createdAt
        email
        type
        updatedAt
      }
      createdAt
      creator {
        id
        fullName
        createdAt
        email
        type
        updatedAt
      }
      status
      dueDate
      tags
    }
  }
`;
