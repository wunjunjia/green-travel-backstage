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
#### 5. http://localhost:3000和http://localhost:8000的cookie是供用的，所以无法在一个浏览器中同时操作两个网站。例如后台登录了，那么前台登录的时候会把cookie重写了，这就导致后台刷新的时候是无法获取到session中的user的，那么就需要重新登录。
#### 6. 获取新插入数据的自增长id
  > 使用select last_insert_id()时要注意，当一次插入多条记录时，只是获得第一次插入的id值，务必注意
  🚌
  🚊
  🚈
  🚴