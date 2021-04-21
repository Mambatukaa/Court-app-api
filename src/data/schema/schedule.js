export const types = `
   type Schedule{
        _id: String
        courtId: String
        startTime: Date
        endTime: Date
    }
`;

const commonFields = `
    courtId: String
    startTime: Date
    endTime: Date
`;

export const mutations = `
    schedulesAdd(${commonFields}): Schedule
`;

export const queries = ``;
