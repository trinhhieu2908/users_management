const getUsers = (state) => state?.users?.users;

const getUsersSelected = (state) => state?.users?.selectedUsers;

export const usersSelectors = { getUsers, getUsersSelected };
