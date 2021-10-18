import {
  mutations as CourtMutations,
  queries as CourtQueries,
  types as CourtTypes
} from './court';

export let types = `
  ${CourtTypes}
`;

export let mutations = `
  ${CourtMutations}
`;

export let queries = `
  ${CourtQueries}
`;

export default {
  types,
  mutations,
  queries
};
