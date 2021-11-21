export const types = `
  type Location {
    latitude: Float
    longitude: Float
  }

  type Court {
    _id: String!
    name: String
    description: String

    featuredImage: String
    parking: String
    ownerId: String
    warning: String
    surface: String
    format: String
    location: Location
    secondaryImages: [String]

    courtSchedule: [Schedule]
  }

  input LocationInput {
    latitude: Float
    longitude: Float
  }
`;

export const queries = `
  courtDetail(_id: String!): Court 
  courtsMain(searchValue: String): [Court]
`;

const commonMutationParams = `
  name: String
  description: String
  featuredImage: String
  secondaryImages: [String]

  parking: String
  ownerId: String
  warning: String
  surface: String
  location: LocationInput
`;

export const mutations = `
  courtsAdd(${commonMutationParams}): Court
  courtsEdit(_id: String!, ${commonMutationParams}): Court
  courtsRemove(_id: String!): JSON
`;
