export const types = `
   type Schedule{
        _id: String
        day: Date
        courtId: String
        startTime: Date
        endTime: Date
        price: String

        bookedPeople: Float
        scheduledCourt: Court
    }
`;

const commonFields = `
    day: Date
    courtId: String
    startTime: Date
    endTime: Date
    price: String
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
