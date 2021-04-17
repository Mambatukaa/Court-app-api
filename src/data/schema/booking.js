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
        courtId: String
        userId: String
        date: DateType
        status: String
    }
`;

export const queries = `
`;

const commonFields = `
    courtId: String!
    userId: String!
    date: Date
    status: String!
`;

export const mutations = `
    bookingAdd(${commonFields}): Booking
`;
