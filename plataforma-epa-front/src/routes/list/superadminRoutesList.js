const superadminPrefix = '/superadmin';
const users = `${superadminPrefix}/users`;
const departaments = `${users}/departaments`;

const superadminRoutesList = {
  superadminDashboard: superadminPrefix,
  users: users,
  createUsers: `${users}/create`,
  getUsers: `${users}/get`,
  departaments: departaments,
  getDepartaments: `${departaments}/get-departaments`,
  getLocations: `${departaments}/get-locations`,
};

export default superadminRoutesList;