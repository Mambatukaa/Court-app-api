import {
  types as UserTypes,
  queries as UserQueries,
  mutations as UserMutations
} from './user';

import {
  types as CourtTypes,
  queries as CourtQueries,
  mutations as CourtMutations
} from './court';

export const types = `
  scalar JSON
  scalar Date
  ${UserTypes}
  ${CourtTypes}


`;

export const queries = `
  type Query {

    ${UserQueries}
    ${CourtQueries}


  }
`;

export const mutations = `
  type Mutation {

    ${UserMutations}
    ${CourtMutations}

  }
`;
