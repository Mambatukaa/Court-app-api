export const types = `

    type DateType{
        day: Int
        month: Int
        year: Int
        hour: Int
        minute: Int
        second: Int
        formatted: String
    }

    type Booking {
        _id: String!
        courtId: String
        userId: String
        date: Date
        status: String
        scheduleId: String
    }
`;

export const queries = `
    bookingDetails(userId: String!): [Booking]
`;

const commonFields = `
    courtId: String!
    userId: String!
    date: Date
    status: String!
    scheduleId: String!
`;

export const mutations = `
    bookingAdd(${commonFields}): Booking
`;
