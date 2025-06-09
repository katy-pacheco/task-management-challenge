import { gql } from "@apollo/client";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      status
      dueDate
      pointEstimate
      assignee {
        id
        fullName
        email
      }
      tags
      position
      createdAt
      creator {
        id
        fullName
      }
    }
  }
`;
