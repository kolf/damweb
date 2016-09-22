let host = "http://dev.dam-server.vcg.com";
// const host = "http://192.168.3.120:8080";

const baseUri = host + "/";
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/syslogin',
  queryUser: 'damUser/pageList',          //查询用户
  createUser: 'damUser/create',           //创建用户
  productsOpts: 'damProduct/list',        //查询产品
  products: 'damProduct/pageList',        //查询产品
  createProduct: 'damProduct/create',     //创建产品
  querySysRes: 'damRes/listSysRes',       //查询系统功能
  queryRes: 'damRes/listNoneSysRes',      //查询功能
};
