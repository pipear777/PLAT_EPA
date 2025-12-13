const authPrefix = '/recover';

const authRoutesList = {
  login: '/login',
  initiate: `${authPrefix}/initiate`,
  code: `${authPrefix}/code`,
  reset: `${authPrefix}/reset`,
};

export default authRoutesList;