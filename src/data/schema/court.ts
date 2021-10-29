export const types = `
  type Location {
    latitude: String
    longitude: String
  }

  type Court {
    _id: String!
    name: String
    description: String

    parking: String
    ownerId: String
    warning: String
    location: Location
    courtDetail: String
    slotSize: String
  }
`;

export const queries = `
  courtDetail(_id: String!): Court 
`;

const commonMutationParams = `
  name: String
  description: String

  parking: String
  ownerId: String
  warning: String
  courtDetail: String
  slotSize: String
`;

export const mutations = `
  courtsAdd(${commonMutationParams}): Court
`;
