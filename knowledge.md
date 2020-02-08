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