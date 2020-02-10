#### 1. css中的object-fit属性可用于img标签，效果等同于background-size
#### 2. 解决node-sass安装失败问题： npm i -D node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
#### 3. 服务端代理图片资源
  ```javascript
    axios.get('xxx', {
      responseType: 'arraybuffer',
    }).then((res) => {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(res.data);
    })
  ```
#### 4. 在js和css中引用静态资源
  ```javascript
    require('@/xxxx')
    url('~@/xxxx')
  ```
#### 5. express-session的cookie处理一定要主要，静态资源最好放在其前面
  > 前台请求后台的图片资源时，会携带前台的cookie，这个cookie与后台的cookie是不一致的，那么express-sesion会重新写cookie给前台,那么这样是不对的.解决方法就是把静态资源放在其前面即可