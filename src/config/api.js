let host = "http://dev.dam-server.vcg.com";

const baseUri = host + "/";
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/syslogin',
  queryUser: 'damUser/pageList',          //��ѯ�û�
  createUser: 'damUser/create',           //�����û�
  productsOpts: 'damProduct/list',        //��ѯ�û���Ʒ
  products: 'damProduct/pageList',        //��ѯ��Ʒ
  createProduct: 'damProduct/create',     //������Ʒ
  querySysRes: 'damRes/listSysRes',     //��ѯϵͳ����
  queryRes: 'damRes/listNoneSysRes',           //��ѯ��ͨ����
};
