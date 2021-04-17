import { types as UserTypes, queries as UserQueries, mutations as UserMutations } from './user';

import { types as CourtTypes, queries as CourtQueries, mutations as CourtMutations } from './court';

import {
  types as BookingTypes,
  queries as BookingQueries,
  mutations as BookingMutations,
} from './booking';

import {
  types as ScheduleTypes,
  queries as ScheduleQueries,
  mutations as ScheduleMutations,
} from './schedule';

export const types = `
  scalar JSON
  scalar Date
  ${UserTypes}
  ${CourtTypes}
  ${BookingTypes}
  ${ScheduleTypes}
`;

export const queries = `
  type Query {

    ${UserQueries}
    ${CourtQueries}
    ${BookingQueries}
    ${ScheduleQueries}
  }
`;

export const mutations = `
  type Mutation {

    ${UserMutations}
    ${CourtMutations}
    ${BookingMutations}
    ${ScheduleMutations}
  }
`;
