export const types = `

  type LocationType {
    lat: String
    lng: String
  }


  type Court {
    _id: String
    createdAt: Date
    
    name: String
    
    image: String

    description: String
  
    warning: String
    parking: String
    courtDetail: String

    location: LocationType

    courtSchedule: [Schedule]
  }

  input LocationInput {
    lat: String
    lng: String
  }
`;

const commonFields = `
  name: String
  shortName: String
  image: String

  lat: String
  lng: String

  description: String

  warning: String
  parking: String
  courtDetail: String

`;

export const mutations = `
    courtsAdd(${commonFields}): Court
    courtEdit(_id: String! ${commonFields}): Court
    removeCourt(_id:String!): JSON
`;

const queryParams = `
  searchValue: String
`;

export const queries = `
    courtDetail(_id: String!): Court 
    allCourts(${queryParams}): [Court]
    courts: [Court]
`;
