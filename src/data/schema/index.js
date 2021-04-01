import {
  types as UserTypes,
  queries as UserQueries,
  mutations as UserMutations
} from './user';

export const types = `
  scalar JSON
  scalar Date
  ${UserTypes}


`;

export const queries = `
  type Query {

    ${UserQueries}



  }
`;

export const mutations = `
  type Mutation {

    ${UserMutations}


  }
`;
