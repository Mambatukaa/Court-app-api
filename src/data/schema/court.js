export const types = `

  type LocationType {
    lat: Float
    lng: Float
  }


  type Court {
    _id: String
    createdAt: Date
    
    name: String
    shortName: String
    image: String

    price: String
    description: String
  
    warning: String
    parking: String
    courtDetail: String

    location: LocationType
  }
  input LocationInput {
    lat: Float
    lng: Float
  }
`;

const commonFields = `
  name: String,
  shortName: String,
  image: String
  price: String
  location: LocationInput
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
