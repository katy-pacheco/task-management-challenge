import { gql } from "@apollo/client";

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
      name
      status
      dueDate
      pointEstimate
      position
      createdAt
      assignee {
        id
        fullName
      }
      creator {
        id
        fullName
      }
      tags
    }
  }
`;
