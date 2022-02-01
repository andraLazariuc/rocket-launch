import { defaultDataIdFromObject, InMemoryCache, makeVar } from '@apollo/client';

export const bookmarksVar = makeVar<string[]>([]);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        bookmarks: {
          read() {
            return bookmarksVar();
          }
        },
      }
    }
  },
  // API is sending launches with same id
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      case 'Launch': return `${responseObject.id}-${responseObject.mission_name}`;
      default: return defaultDataIdFromObject(responseObject);
    }
  }
});