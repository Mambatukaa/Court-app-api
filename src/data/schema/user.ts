export const types = `
  type User {
    _id: String!
    firstName: String
    lastName: String
    username: String
  }

  type AuthPayload {
    token: String
    refreshToken: String
  } 
`;

export const queries = `
  userDetail(_id: String!): User
  currentUser: User
`;

const commonMutationParams = `
  email: String!
  password: String!
`;

export const mutations = `
  usersCreate(${commonMutationParams}): User
  usersEdit(_id: String! ${commonMutationParams}): User
  usersRemove(_id: String!): JSON
  login(email: String! password: String!): AuthPayload
  logout: String
`;
