export const types = `
   type Schedule{
        _id: String
        courtId: String
        day: Date
        startTime: String
        endTime: String
    }
`;

const commonFields = `
    courtId: String!
    day: Date!
    starTime: String!
    endTime: String!
`;

export const mutations = `
    schedulesAdd(${commonFields}): Schedule
`;

export const queries = ``;
