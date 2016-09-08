/**
 * Created by tonglaiz on 2016/9/7.
 */
// dev test prod
// http://node.edit.vcg.com/src/ http://edit.vcg.com/src/

const env = "dev";
let passportUrl = "";
let editorUrl   = "";
let cmsTopicUrl = "";
let cmsAdUrl    = "";

if(env=="dev") {
    passportUrl   = "http://111.200.62.68:8008";
    editorUrl     = "http://111.200.62.68:8005"; //  192.168.3.123:8005 111.200.62.68:8005
    cmsTopicUrl   = "http://123.56.31.128:10001";
    cmsAdUrl      = "http://123.56.31.128:8002";
}
if(env=="test") {
    passportUrl   = "http://test.usercenter.content.vcg.com";
    editorUrl     = "http://test.edit.content.vcg.com";
    cmsTopicUrl   = "http://test.web.topic.ms.vcg.com";
    cmsAdUrl      = "http://test.web.other.ms.vcg.com";
}
if(env=="prod") {
    passportUrl   = "http://usercenter.content.vcg.com";
    editorUrl     = "http://edit.content.vcg.com";
    cmsTopicUrl   = "http://web.topic.ms.vcg.com";
    cmsAdUrl      = "http://web.other.ms.vcg.com";
}

export {
    passportUrl,
    editorUrl,
    cmsTopicUrl,
    cmsAdUrl
}