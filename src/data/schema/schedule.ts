export const types = `
  type Schedule {
    _id: String
    courtId: String
    price: Int

    startDate: Date
    endDate: Date

    bookedPeople: Int
    
    scheduledCourt: Court
  }

`;

export const queries = `
  scheduleDetail(_id: String!): Schedule
  schedulesMain(ids: [String] courtId: String): [Schedule]
`;

const commonMutationParams = `
  courtId: String
  price: Int
  startDate: Date
  endDate: Date
`;

export const mutations = `
  schedulesAdd(${commonMutationParams}): Schedule
`;
