export const types = `
  type User {
    _id: String!
    firstName: String!
  }
`;

export const queries = `
  userDetail(_id: String!): User
`;

const commonMutationParams = `
  firstName: String
  lastName: String
  phone: String
`;

export const mutations = `
  usersAdd(${commonMutationParams}): User
  usersEdit(_id: String! ${commonMutationParams}): User
  usersRemove(_id: String!): String
`;
