import strings from './strings';

const {roles: roleStrings} = strings;

const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  author: [],
  mod: ['getUsers', 'manageUsers'],
};

export const roleNames = {
  user: roleStrings.USER,
  admin: roleStrings.ADMIN,
  mod: roleStrings.MOD,
  author: roleStrings.AUTHOR,
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
