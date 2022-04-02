import {
    gql,
} from "@apollo/client";

export const GET_TAGS= gql`{
  expenses(order_by: {created_at: desc}, where: {and: [{created_at: {lt: $to}}, {created_at: {gte: $from}}]}) {
    tags
  }
}
`