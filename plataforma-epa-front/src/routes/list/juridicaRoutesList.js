const juridicaPrefix = '/juridica';
const historical = `${juridicaPrefix}/historical`;
const contracts = `${juridicaPrefix}/contracts`;
const lawyers = `${juridicaPrefix}/lawyers`;

const juridicaRoutesList = {
  juridicaDashboard: juridicaPrefix,

  contracts: contracts,
  createContracts: `${contracts}/create`,
  listContracts: `${contracts}/list`,

  lawyers: lawyers,

  historical: historical,
}

export default juridicaRoutesList;