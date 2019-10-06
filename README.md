## 自学前端路上的第一个vue项目

 - 下载之后先安装依赖包
 - 终端下运行 **`npm install`**
 - 安装完成后运行 **`npm run dev`** 即可
 ## 所使用的
 - webpack
 - vue-router
 - vuex
 - axios
 - Mint-UI
 - MUI

 ## 功能
 
 - 新闻资讯
 - 图片分享
 - 商品购买
 - 购物车功能


## 注意点
- mui icon扩展图标需要额外引入另外一个css和图标文件

## 补充
### 懒加载
用的是`mint-ui`的`lazy load`
>不能分块导入，只能全部导入，不然懒加载图标不生效，并且要引入样式文件。
具体用法如下：

```js
import Mint from "mint-ui"
import "mint-ui/lib/style.css"
Vue.config.productionTip = false
Vue.use(Mint)
```
### js方法
- domobject.getBoundingClientRect()
> 这个方法返回一个矩形对象，包含四个属性：left、top、right、bottom。分别表示元素各边与页面上边和左边的距离。
 domobject.getBoundingClientRect().top；//元素上边距离页面上边的距离
 domobject.getBoundingClientRect().right//元素右边距离页面左边的距离
 domobject.getBoundingClientRect().bottom；//元素下边距离页面上边的距离
 domobject.getBoundingClientRect().top；//元素左边距离页面左边的距离


# 开启Apache的gzip压缩
> 要让Apache支持gzip功能，要用到deflate_Module和headers_Moudule。打开apache的配置文件httpd.conf,大约在105行左右，找到以下两行内容：（不是连续的）。然后将#去掉取消注释，表示开启gzip压缩功能。
`#LoadModule deflate_module modules/mod_deflate.so`
`#LoadModule headers_module modules/mod_headers.so`
> 开启后还需要在httpd.conf文件的最后添加以下内容即可：
```php
<IfModule deflate_module>
    #必须的，就像一个开关一样，告诉apache对传输到浏览器的内容进行压缩
    SetOutputFilter DEFLATE
    DeflateCompressionLeavel 9
</IfModule>
```
>最少需要加以上内容Kaineng生效。`DeflateCompressionLevel`表示压缩级别，值从1到9，值越大压缩体积越小。

# 使用ngrok将本机映射为一个外网的Web服务器
> 由于默认使用的美国的服务器进行中间转接，所以访问速度非常慢，访问时客气用FQ软件，提高网页打开速度.

