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
  uploadWaterprint: 'orgWaterprint/uploadWaterprint',  //上传水印
  updateWaterPosition:'orgWaterprint/updatePosition',  //修改水印位置
  searchAudio:'audio2016/pageList',       //音频资源查询分页显示
  listAudio:'audio2016/pageList',         //音频列表分页显示
  uploadAudio:'audio2016/upload',         //上传音频资源详情
  audioDetail:'audio2016/view',           //音频详情
  audioUpdate:'audio2016/update'           //音频修改
  searchVideo:'video2016/pageList',       //视频资源查询分页显示
  listVideo:'video2016/pageList',        //视频列表分页显示
  uploadVideo:'video2016/upload',        //上传频资源视
  videoDetail:'video2016/view',           //视频详情
  videoUpdate:'video2016/update'          //视频修改
};
