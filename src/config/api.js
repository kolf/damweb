//const host = "http://dev.dam-server.vcg.com";
import cookie from 'js-cookie';
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
  searchAudio:'audio2016/pageList',       //音频资源查询分页显示
  listAudio:'audio2016/pageList',         //音频列表分页显示
  uploadAudio:'audio2016/uploadAudio?token='+ token,         //上传音频资源详情
  audioDetail:'audio2016/view',           //音频详情
  audioUpdate:'audio2016/update?token='+ token,         //音频修改
  audioUploadAttach:'audio2016/uploadAttach?token='+ token,         //音频修改
  searchVideo:'video2016/pageList',       //视频资源查询分页显示
  listVideo:'video2016/pageList',         //视频列表分页显示
  uploadVideo:'video2016/uploadVideo?token='+ token,         //上传频资源视
  videoDetail:'video2016/view',           //视频详情
  videoUpdate:'video2016/update?token='+ token,         //视频修改
  videoUploadAttach:'video2016/uploadAttach?token='+ token,         //视频修改
  uploadImg :'img/uploadImg?token='+ token,             //图片上传
  updateImg :'img/update?token='+ token,             //图片编辑
  uploadImgAttach: 'img/uploadAttach?token='+ token,
  category: 'category/treeView',
  vcgCategory: 'vcgCategory/list',
  listOrgRoles:'damRole/list?token='+ token,   //组织机构内的角色列表
  createRole:'damRole/createRole?token='+ token,//组织机构自建角色

  queryResource: 'damMedia/pageList?token='+ token,
};
