<template>
  <div>
    <!-- 本系统使用说明 -->
    <div style="padding: 30px">
      一 :
      navicat创建数据库，将后端的sql分别执行,然后在库中创建两个数据表，菜单表字段分别是
      id，menuName，url，price， 名称可以自定义，
      存储的内容是菜名，图片地址，和菜的价格。店铺表字段id，和店名即可。<br /><br />
      二 :
      创建成功后，在系统工具中代码生成导入刚才生成的表，点预览(小眼睛)，按照各个层级在后端代码中创建即可。<br /><br />
      三 : 系统分两个功能板块 添加菜单 和 选择菜数随机选菜
      的功能，在点餐系统中上面的导航栏进行切换选择<br /><br />
      四 :
      增添菜单选项，可以将要随机的菜添加到库进行随机选菜，按照表单添加即可，将要用的图片手动拖进assets文件夹中的images中，名字格式必须是<code
        style="color: red; font-size: 22px; font-weight: bold"
        >/src/assets/images/xxxx.xxx</code
      >的格式，前面4个x是菜名，后面3x是格式名<br /><br />
      五 : 选择菜数 直接填写要随机的菜数量
      按随机就能随机生成菜和图片，显示总价可以看到菜的总价格。<br /><br />
      添加样例：
      <br /><br />
      菜名 ： 麻辣香锅 <br />
      图片地址 ：/src/assets/images/麻辣香锅.png <br />
      价格：20 <br /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: "explain",
  data() {
    return {};
  },
};
</script>

<style>
</style>