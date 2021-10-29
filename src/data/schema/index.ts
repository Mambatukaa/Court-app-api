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

import {
  mutations as ScheduleMutations,
  queries as ScheduleQueries,
  types as SchedulesTypes
} from './schedule';

export let types = `
  scalar JSON
  scalar Date

  ${CourtTypes}
  ${UserTypes}
  ${BookingTypes}
  ${SchedulesTypes}
`;

export let mutations = `
  ${CourtMutations}
  ${UserMutations}
  ${BookingMutations}
  ${ScheduleMutations}
`;

export let queries = `
  ${CourtQueries}
  ${UserQueries}
  ${BookingQueries}
  ${ScheduleQueries}
`;

export default {
  types,
  mutations,
  queries
};
