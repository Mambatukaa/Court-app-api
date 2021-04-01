export const types = `
`;

export const mutations = `
    courtsAdd(name: String, shortName:String): JSON
    courtEdit(_id: String!, name: String, shortName: String): JSON
    removeCourt(_id:String!): JSON
`;

export const queries = `
    courtDetail(_id: String!): JSON 
    allCourts: JSON
`;
