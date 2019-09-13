## 自学前端路上的第一个小项目

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


