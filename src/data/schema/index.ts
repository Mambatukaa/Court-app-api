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

export let types = `
  scalar JSON
  scalar Date

  ${CourtTypes}
  ${UserTypes}
`;

export let mutations = `
  ${CourtMutations}
  ${UserMutations}
`;

export let queries = `
  ${CourtQueries}
  ${UserQueries}
`;

export default {
  types,
  mutations,
  queries
};
