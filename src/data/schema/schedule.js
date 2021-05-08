export const types = `
   type Schedule{
        _id: String
        courtId: String
        startTime: Date
        endTime: Date
        price: Float

        bookedPeople: Float
        scheduledCourt: Court
    }
`;

const commonFields = `
    courtId: String
    startTime: Date
    endTime: Date
    price: Float
`;

const queryParams = `
  ids: [String]
`;

export const mutations = `
    schedulesAdd(${commonFields}): Schedule
    schedulesDelete(_id: String!): String
`;

export const queries = `
    allSchedules(${queryParams}): [Schedule]
    scheduleDetail(_id: String!): Schedule
`;
