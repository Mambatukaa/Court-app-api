import { types as UserTypes, queries as UserQueries, mutations as UserMutations } from './user';

import { types as CourtTypes, queries as CourtQueries, mutations as CourtMutations } from './court';

import {
  types as BookingTypes,
  queries as BookingQueries,
  mutations as BookingMutations,
} from './booking';

export const types = `
  scalar JSON
  scalar Date
  ${UserTypes}
  ${CourtTypes}
  ${BookingTypes}

`;

export const queries = `
  type Query {

    ${UserQueries}
    ${CourtQueries}
    ${BookingQueries}

  }
`;

export const mutations = `
  type Mutation {

    ${UserMutations}
    ${CourtMutations}
    ${BookingMutations}
  }
`;
