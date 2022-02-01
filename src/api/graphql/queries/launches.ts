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

export const GET_UPCOMING_LAUNCHES_QUERY = gql `
  query launchesUpcoming {
    launchesUpcoming {
      id
      mission_name
      launch_site {
        site_name
        }
      launch_date_utc
    }
  }
`;

export const GET_BOOKMARKED_LAUNCHES_QUERY = gql`
  query getBookmarks {
    bookmarks @client
  }
`;