import cookie from 'js-cookie';

// const host = "http://dev.dam-server.vcg.com";
// const host = "http://192.168.3.178:8080";
const host = "http://192.168.3.120:8080";
// const host = "http://192.168.3.109:8080";

const baseUri = host + "/";

const token = cookie.get('token');

export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/userlogin',
  queryUser: 'damUser/pageList?token='+ token,          //查询用户
  queryOrgUser: 'damUser/orgUserList?token='+ token,          //查询用户
  createUser: 'damUser/create?token=' + token,           //创建用户
  productsOpts: 'damProduct/list',        //查询产品
  products: 'damProduct/pageList',        //查询产品
  createProduct: 'damProduct/create',     //创建产品
  querySysRes: 'damRes/listSysRes',       //查询系统功能
  queryRes: 'damRes/listNoneSysRes',      //查询功能
  uploadWaterprint: 'orgWaterprint/uploadWaterprint',  //上传水印
  updateWaterPosition:'orgWaterprint/updatePosition',  //修改水印位置
  searchAudio:'audioRes/pageList',       //音频资源查询分页显示
  listAudio:'audioRes/pageList',         //音频列表分页显示
  uploadAudio:'audioRes/uploadAudio?token='+ token,         //上传音频资源详情
  audioDetail:'audioRes/view?token='+ token,           //音频详情
  audioUpdate:'audioRes/update?token='+ token,         //音频修改
  audioUploadAttach:'audioRes/uploadAttach?token='+ token,         //音频修改
  searchVideo:'videoRes/pageList',       //视频资源查询分页显示
  listVideo:'videoRes/pageList',         //视频列表分页显示
  uploadVideo:'videoRes/uploadVideo?token='+ token,         //上传频资源视
  videoDetail:'videoRes/view?token='+ token,           //视频详情
  videoUpdate:'videoRes/update?token='+ token,         //视频修改
  videoUploadAttach:'videoRes/uploadAttach?token='+ token,         //视频修改
  uploadImg :'img/uploadImg?token='+ token,             //图片上传
  updateImg :'img/update?token='+ token,             //图片编辑
  uploadImgAttach: 'img/uploadAttach?token='+ token,
  imageDetail: 'img/view?token='+ token,
  category: 'category/treeView',
  vcgCategory: 'vcgCategory/list',
  listOrgRoles:'damRole/list?token='+ token,   //组织机构内的角色列表
  createRole:'damRole/createRole?token='+ token,//组织机构自建角色
  authUser:'damUserRole/authUser?token='+ token,     //为用户授权
  queryResource: 'damMedia/pageList?token='+ token,
  review: 'auditor/audit?token='+ token,
  updateImageGroup: 'imgGroup/create?token='+ token,
  queryCategory: 'category/treeView?token='+ token,
  createCategory: 'category/create?token='+ token,
  removeCategory: 'category/delete?token='+ token,
};
