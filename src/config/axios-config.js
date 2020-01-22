import axios from 'axios';
import { Message } from 'element-ui';

axios.interceptors.request.use(config => config, (e) => {
  Message.error({
    message: '请求超时，请稍后重试！',
  });
  return Promise.reject(e);
});

axios.interceptors.response.use(response => response, (e) => {
  Message.error({
    message: '服务端出错啦！',
  });
  return Promise.reject(e);
});