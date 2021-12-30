const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  author: [],
  mod: ['getUsers', 'manageUsers'],
};

export const roleNames = {
  user: 'Regular user',
  admin: 'Administrator',
  mod: 'Moderator',
  author: 'Author',
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
