// require('es6-promise').polyfill();
// import fetch from 'isomorphic-fetch';
import apis from './myapi';

import cookieParser from './cookie.js';
import axios from 'axios';
import { Message, Loading} from 'element-ui';

/**
 * 开发环境
 * truEnv {object}
 */
// let truEnv = process.env;
// let truHost = 'http://192.168.2.106:13001/mpm'; // 测试
// let truHost = 'http://plmappmpm.gree.com/gy/mpm'; // 测试
// let truHost = 'http://192.168.2.124:13001/mpm'; // 才发
// let truHost = 'http://192.168.2.119:8080/mpm'; // 石科
// let truHost = window.gateway + '/gy/mpm'; // 生产
// let truHost = 'http://192.168.1.10:13001/mpm'; //odc才发
//let truHost = 'http://192.168.6.1:13001/mpm'; //odc虎哥
 //let truHost = 'http://127.0.0.1:13001/mpm'; //odc虎哥
 let truHost = 'http://192.168.1.32:13002'; //开发-家勇
 let token = cookieParser.getCookie('token') || 'c8cf88057fd85dc0578eb80044d903404dcfdbec5d8451';
//  let accessToken = sessionStorage.getItem(window.appkey) || 'cecac4017bdb11c0548eef5712d15e4117cddde712895586ec0138da53ae0ff68abae97d6ea4a58453e721cdc4';

/**
 * 设置任务路径
 */
let appPath = window.location.href;
if (appPath.includes('assembly')) {
    localStorage.setItem('taskPath', 'assembly');
} else if (appPath.includes('molding')) {
    localStorage.setItem('taskPath', 'molding');
} else if (appPath.includes('metalPlate')) {
    localStorage.setItem('taskPath', 'metalPlate');
}

// 必须要传的header
let requiredHeaders = {
    accesstoken: token,
    //  access_token: accessToken
};

/**
 * 默认请求设置
 */
let defaultParams = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //  'access_token': accessToken,
         'accesstoken': token
    },
    credentials: 'include',
    // mode: 'cors'
}

const myfetch = function (url, params) {
    // 合并必传 的header, 和 用户自定义的header
    let headers = Object.assign({}, requiredHeaders, (params && params.headers || {}));
    // let headers = Object.assign({},  (params && params.headers || {}));
    //请求地址：公共地址+需求地址+参数
    url = truHost + apis[url] + (params && params.query || '');
    // if (url.indexOf("?") > -1) {
    //     url = url + '&timestamp=' + Date.parse(new Date());
    // } else {
    //     url = url + '?timestamp=' + Date.parse(new Date());
    // }

    // if (document.documentMode && document.documentMode < 10) {
    //     url = url + '&accesstoken=' + accessToken + "&content-type=application/json";
    // }
    //请求总数据
    let opt = {
        url: url,
        method: params && params.method || 'get',
    //    data: (params && params.body) ? JSON.parse(params.body) : {},
        headers: headers
    }

    // console.log('opt: ', opt);

    return new Promise((resolve, reject) => {
        return axios(opt)
            .then((response) => {
               
                if (response.data.code == 0) {
                    resolve(response.data);
                } else {
                    // Message.error(response.data.message);
                    // reject(response.data);
                }
            })
            .catch((err) => {
              console.log(err)
                // Message.error({message:"111"});
                reject(err);
            });
    });
}

export default myfetch
export { defaultParams, truHost }
