export const types = `
    type User {
        _id: String
        username: String
        email: String
        role: String
        avatar: String,
        firstName: String,
        lastName: String,
        phone: String,
        position: String,
        password: String
    }

    type AuthPayload {
        token: String
        refreshToken: String
    }
`;

const params = `
    username: String
    email: String
    role: String
    password: String
    avatar: String,
    firstName: String,
    lastName: String,
    phone: String,
    position: String,
`;

export const queries = `
    users(page: Int, perPage: Int, searchValue: String, 
        role: String, email: String, phone: String, username: String): [User]
    userDetail(_id: String): User
    currentUser: User
    usersCount(role: String, isBanned: Boolean): Int
    expertUsers: [User]
`;

export const mutations = `
    userCreate(${params}): User
    userUpdate(_id: String, ${params}): User
    userRemove(_id: String): User

    login(input: String!, password: String!): AuthPayload
    registerMember(email: String!): User
    profileEdit(
        username: String,
        email: String,
        password: String,
        avatar: String,
        firstName: String,
        lastName: String,
        phone: String,
        position: String): User
    forgotPassword(email: String!): String
    resetPassword(token: String!, newPassword: String!): User
    usersChangePassword(currentPassword: String, newPassword: String): User
    sendMessage(userId:String!, message: String!): String
`;
