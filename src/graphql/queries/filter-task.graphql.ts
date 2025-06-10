import { gql } from "@apollo/client";

export const GET_FILTER_TASKS = gql`
  query getFilterTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
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
