import { gql } from "@apollo/client";

export const GET_LAUNCH_BY_ID_QUERY = gql `
  query launch($id: ID!) {
    launch(id: $id) {
      id
      name
    }
  }
`;

export const GET_NEXT_LAUNCH_QUERY = gql `
  query launchNext {
    launchNext {
      mission_name
      launch_date_utc
    }
  }
`;