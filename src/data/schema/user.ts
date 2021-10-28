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
  email: String
  phone: String
  password: String
`;

export const mutations = `
  usersCreate(${commonMutationParams}): User
  usersEdit(_id: String! ${commonMutationParams}): User
  usersRemove(_id: String!): String
  login(email: String! password: String!): String
`;
