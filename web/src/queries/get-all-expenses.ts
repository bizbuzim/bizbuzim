import {
    gql,
} from "@apollo/client";

export const GET_ALL_EXPENSES = gql`{
  expenses(order_by: {created_at: desc}, where: {created_at: {gt: "2022-01-03"}}) {
    id
    name
    payment
    tags
    price
  }
}
`