/*
 * @Author: zhangcunxia
 * @Email: zcx4150@gmail.com
 * @Date: 2020-06-21 13:04:08
 * @LastEditTime: 2020-06-21 13:10:12
 * @LastEditors: zhangcunxia
 * @Description: 
 */ 
import axios from 'axios'
import {Toast} from 'antd-mobile'

axios.interceptors.request.use(config => {
    Toast.loading('加载中', 0);
    return config;
})

axios.interceptors.response.use(config=> {
    setTimeout(()=>{
        Toast.hide();
    }, 2000);
    return config;
})