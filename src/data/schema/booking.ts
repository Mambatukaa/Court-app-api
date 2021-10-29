export const types = `
  type Booking {
    _id: String!
  }

`;

export const queries = `
  bookingDetail(_id: String!): Booking

`;

const bookingMutationParams = `
  courtId: String
`;

export const mutations = `
  bookingsAdd(${bookingMutationParams}): Booking
`;
