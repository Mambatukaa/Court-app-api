export const types = `
  type Court {
    _id: String!
    title: String
    size: String
  }
`;

export const queries = `
  courtDetail(_id: String!): Court 
`;

export const mutations = `
  addCourt(title: String): Court
`;
