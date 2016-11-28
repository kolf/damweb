const host = "http://123.57.3.226:8080";
// const host = "http://192.168.3.178:8080";
// const host = "http://192.168.3.120:8080";
// const host = "http://192.168.3.109:8080";

const baseUri = host + "/";

export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/userlogin',
  queryUser: 'damUser/pageList',          //查询用户
  queryOrgUser: 'damUser/orgUserList',          //查询用户
  createUser: 'damUser/create',           //创建用户
  productsOpts: 'damProduct/list',        //查询产品
  products: 'damProduct/pageList',        //查询产品
  createProduct: 'damProduct/create',     //创建产品
  querySysRes: 'damRes/listSysRes',       //查询系统功能
  queryRes: 'damRes/listNoneSysRes',      //查询功能
  uploadWaterprint: 'orgWaterprint/uploadWaterprint',  //上传水印
  updateWaterPosition:'orgWaterprint/updatePosition',  //修改水印位置
  searchAudio:'audioRes/pageList',       //音频资源查询分页显示
  listAudio:'audioRes/pageList',         //音频列表分页显示
  uploadAudio:'audioRes/uploadAudio',         //上传音频资源详情
  audioDetail:'audioRes/view',           //音频详情
  audioUpdate:'audioRes/update',         //音频修改
  audioUploadAttach:'audioRes/uploadAttach',         //音频修改
  searchVideo:'videoRes/pageList',       //视频资源查询分页显示
  listVideo:'videoRes/pageList',         //视频列表分页显示
  uploadVideo:'videoRes/uploadVideo',         //上传频资源视
  videoDetail:'videoRes/view',           //视频详情
  videoUpdate:'videoRes/update',         //视频修改
  removeUpdate:'videoRes/delete',         //视频修改
  videoUploadAttach:'videoRes/uploadAttach',         //视频修改
  uploadImg :'img/uploadImg',             //图片上传
  updateImg :'img/update',             //图片编辑
  uploadImgAttach: 'img/uploadAttach',
  imageDetail: 'img/view',
  category: 'category/treeView',
  vcgCategory: 'vcgCategory/list',
  listOrgRoles:'damRole/list',   //组织机构内的角色列表
  createRole:'damRole/createRole',//组织机构自建角色
  authUser:'damUserRole/authUser',     //为用户授权
  queryResource: 'damMedia/pageList',
  review: 'auditor/audit',
  updateImageGroup: 'imgGroup/create',

  queryCategory: 'category/treeView',
  queryVcgCategory: 'vcgCategory/treeView',
  createCategory: 'category/create',
  removeCategory: 'category/delete',
  updateCategory: 'category/update',
};
