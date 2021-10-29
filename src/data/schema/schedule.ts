export const types = `
  type Schedule {
    _id: String
    price: String
  }

`;

export const queries = `
  scheduleDetail(_id: String!): Schedule
`;

const commonMutationParams = `
  price: String
`;

export const mutations = `
  schedulesAdd(${commonMutationParams}): Schedule
`;
