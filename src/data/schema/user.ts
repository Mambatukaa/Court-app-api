export const types = `
  type User {
    _id: String!
    firstName: String
    lastName: String
    email: String
    username: String
    role: String
  }

  type AuthPayload {
    token: String
    refreshToken: String
  } 
`;

export const queries = `
  userDetail(_id: String!): User
  currentUser: User
  allUsers: [User]
`;

const commonMutationParams = `
  email: String!
  username: String!
  password: String!
`;

export const mutations = `
  usersCreate(${commonMutationParams}): User
  usersEdit(_id: String! ${commonMutationParams}): User
  usersRemove(_id: String!): JSON
  login(email: String! password: String!): AuthPayload
  logout: String
`;
