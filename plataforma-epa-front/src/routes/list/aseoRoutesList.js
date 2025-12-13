const aseoPrefix = '/aseo';
const overtimes = `${aseoPrefix}/overtimes`;
const workers = `${aseoPrefix}/workers`;
const reports = `${aseoPrefix}/reports`;

const aseoRoutesList = {
  aseoDashboard: aseoPrefix,
  overtimes: overtimes,
  createOvertimes: `${overtimes}/create`,
  getOvertimes: `${overtimes}/get`,
  workers: workers,
  createWorkers: `${workers}/create`,
  getWorkers: `${workers}/get`,
  reports: reports,
};

export default aseoRoutesList;
