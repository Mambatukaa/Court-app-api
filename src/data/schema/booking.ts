export const types = `
  type Booking {
    _id: String!
    scheduleId: String
    courtId: String
  }

`;

export const queries = `
  bookingDetail(_id: String!): Booking
`;

const bookingMutationParams = `
  courtId: String
  scheduleId: String
`;

export const mutations = `
  bookingsAdd(${bookingMutationParams}): Booking
`;
