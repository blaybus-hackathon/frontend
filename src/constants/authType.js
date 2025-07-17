export const SERVER_ROLE = {
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
};

export const CLIENT_ROLE = {
  CENTER: 'center',
  HELPER: 'helper',
};

export const ROLE_MAP = {
  // server -> client
  toClient: {
    [SERVER_ROLE.MANAGER]: CLIENT_ROLE.CENTER,
    [SERVER_ROLE.MEMBER]: CLIENT_ROLE.HELPER,
  },

  // client -> server
  toServer: {
    [CLIENT_ROLE.CENTER]: SERVER_ROLE.MANAGER,
    [CLIENT_ROLE.HELPER]: SERVER_ROLE.MEMBER,
  },
};
