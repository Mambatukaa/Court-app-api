import {
  mutations as CourtMutations,
  queries as CourtQueries,
  types as CourtTypes
} from './court';

import {
  mutations as UserMutations,
  queries as UserQueries,
  types as UserTypes
} from './user';

import {
  mutations as BookingMutations,
  queries as BookingQueries,
  types as BookingTypes
} from './booking';

export let types = `
  scalar JSON
  scalar Date

  ${CourtTypes}
  ${UserTypes}
  ${BookingTypes}
`;

export let mutations = `
  ${CourtMutations}
  ${UserMutations}
  ${BookingMutations}
`;

export let queries = `
  ${CourtQueries}
  ${UserQueries}
  ${BookingQueries}
`;

export default {
  types,
  mutations,
  queries
};
