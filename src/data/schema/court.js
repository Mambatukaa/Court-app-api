export const types = `
  type Court {
    _id: String
    createdAt: Date
    
    name: String
    shortName: String
    image: String

    price: String
    locations: [Float]
    description: String
  
    warning: String
    parking: String
    courtDetail: String
  }
`;

const commonFields = `
  name: String,
  shortName: String,
  image: String
  price: String
  locations: [Float]
  description: String

  warning: String
  parking: String
  courtDetail: String

`;

export const mutations = `
    courtsAdd(${commonFields}): Court
    courtEdit(_id: String!, name: String, shortName: String): JSON
    removeCourt(_id:String!): JSON
`;

export const queries = `
    courtDetail(_id: String!): Court 
    allCourts: [Court]
`;
