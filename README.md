## 使用
### 安装
```
git clone git@gitlab.vcg.com:dam/damAdmin.git
cd damAdmin
npm install

# 开发
npm run start
# 模拟数据
npm run start:mock
# 测试
npm run test
# 发布
npm run build
```

## 目录结构

```shell
├── README.md
├── coverage # test coverage report
├── dist  # production build directory
│   ├── 269268ade790db48e9dcc5eb0db587cd.jpg
│   ├── antd.f7f5aa5b8e507559a22db55944433a23.css
│   ├── app.89f9817729a2b19dc35586b6f0505c83.css
│   ├── app.fa0e73813f3ce3a7605d.js
│   ├── favicon.ico
│   └── index.html
├── package.json
├── src  # source directory
│   ├── actions  # write your redux action here
│   │   ├── users.js  # redux action
│   │   └── users.spec.js  # redux action test
│   ├── components  # write your redux components here
│   │   ├── CustomTable.js
│   │   └── NotFoundPage  # this is a folder which include NotFound.js, NotFoundPage.scss, NotFound.spec.js
│   ├── config
│   │   └── api.js  # write your api config here
│   ├── constants  # some constants
│   │   └── actionTypes.js
│   ├── containers  # write your redux containers here
│   │   ├── AccessControl.js
│   │   ├── App  # App.js App.scss
│   ├── data
│   │   └── db.json  # mock data file
│   ├── favicon.ico
│   ├── index.html  # template index.html
│   ├── UploadImageGroup.js  # entry file
│   ├── reducers  # write your redux reducers here.
│   │   ├── UploadImageGroup.js  # entry file
│   │   ├── initialState.js  # put all of the initial state in here
│   │   ├── users.js  # users reducers
│   │   └── users.spec.js  # users reducers spec
│   ├── routes.js  # routes
│   ├── store  # store
│   │   ├── configureStore.dev.js
│   │   ├── configureStore.js
│   │   └── configureStore.prod.js
│   └── utils  # utils file
│       └── cFetch.js
├── tools  # some tools script
│   ├── build.js
│   ├── chalkConfig.js
│   ├── distServer.js
│   ├── mock.js
│   ├── pre-commit
│   ├── srcServer.js
│   ├── startMessage.js
│   ├── testSetup.js
│   └── updateIndexHTML.js
├── webpack.config.dev.js  # webpack config of dev
└── webpack.config.prod.js  # webpack config of production
```
