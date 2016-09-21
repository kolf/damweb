let host = "http://dev.dam-server.vcg.com";
// const host = "http://192.168.3.120:8080";

const baseUri = host + "/";
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/syslogin',
  queryUser: 'damUser/pageList',          //????
  createUser: 'damUser/create',           //????
  productsOpts: 'damProduct/list',        //??????
  products: 'damProduct/pageList',        //????
  createProduct: 'damProduct/create',     //????
  querySysRes: 'damRes/listSysRes',     //??????
  queryRes: 'damRes/listNoneSysRes',           //??????
};
