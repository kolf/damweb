let host = "http://192.168.3.120:9090";

const baseUri = host + "/";
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/syslogin',
  queryUser: 'users',
  createUser: 'damUser/create',
  queryUserProducts: 'damProduct/list',
  products: 'products',
};
