import { gql } from "@apollo/client";

export const GET_ALL_EXPENSES = gql`
  query GetAllExpenses($from: Date, $to: Date) {
    expenses(
      order_by: { created_at: desc }
      where: {
        and: [{ created_at: { lt: $to } }, { created_at: { gte: $from } }]
      }
    ) {
      id
      name
      payment
      tags
      price
    }
  }
`;
