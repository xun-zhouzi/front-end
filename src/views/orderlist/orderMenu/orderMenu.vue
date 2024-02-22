<template>
  <div>
    <!-- 导航栏 -->
    <el-menu
      class="el-menu-demo"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item style="width: 220px" index="1">增添菜单</el-menu-item>
      <el-menu-item style="width: 220px" index="2">选择菜数</el-menu-item>
    </el-menu>
    <!-- 功能标签  -->
    <div class="main">
      <!-- 标签1 -->
      <div v-show="tagShow1" class="tag1">
        <div>
          <h3 style="margin-left: 50%">菜单</h3>
          <el-form
            ref="formRef"
            :model="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
            style="width: 400px"
          >
            <!-- 输入菜名 -->
            <el-form-item
              label="菜名"
              prop="menuName"
              :rules="[{ required: true, message: '菜单名不能为空' }]"
            >
              <el-input
                v-model="numberValidateForm.menuName"
                type="text"
                autocomplete="off"
              />
            </el-form-item>

            <!-- 输入地址 -->
            <el-form-item
              label="图片地址"
              prop="url"
              :rules="[{ required: true, message: '图片地址不能为空' }]"
            >
              <el-input
                v-model="numberValidateForm.url"
                type="text"
                autocomplete="off"
                placeholder="格式：/src/assets/images/xxxx.xxx"
              />
            </el-form-item>
            <!-- 输入价格 -->
            <el-form-item
              label="价格"
              prop="price"
              :rules="[
                { required: true, message: '价格不能为空' },
                { type: 'number', message: '价格必须是数字类型' },
              ]"
            >
              <el-input
                v-model.number="numberValidateForm.price"
                type="text"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                :plain="true"
                type="primary"
                @click="submitForm(formRef)"
                >添加</el-button
              >
              <el-button @click="resetForm(formRef)">重置</el-button>

              <el-button @click="looklist" style="margin-left: 10px"
                >菜单</el-button
              >
              <el-button @click="explain">说明</el-button> </el-form-item
            ><br />
          </el-form>

          <!-- 弹出窗口 -->
          <el-dialog v-model="dialogTableVisible" title="菜单详情">
            <el-table :data="querylist" style="width: 100%">
              <el-table-column property="menuName" label="菜 名" width="150" />
              <el-table-column property="url" label="图片地址" width="280" />
              <el-table-column property="price" label="价 格" width="150">
                <template #default="scope">
                  <div style="color: red">
                    {{ scope.row.price }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label=" 操 作" class="custom-header">
                <template #default="scope">
                  <div>
                    <el-button
                      :plain="true"
                      size="small"
                      @click="deleteMenu(scope)"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column></el-table
            >
            <!-- 分页 -->
            <el-pagination
              style="padding-top: 20px; padding-left: 20px"
              :page-sizes="[10, 20]"
              v-model:page-size="pageSize"
              v-model:current-page="pageNum"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalLimit"
            />
          </el-dialog>
        </div>
      </div>
      <!-- 标签2 -->
      <div v-show="tagShow2" class="tag2">
        <div>
          <div>
            <!-- 选择菜数 -->
            <div style="margin-left: 30%">
              <h3 style="margin-left: 20%">随机订菜</h3>

              <el-input
                v-model="amount"
                style="width: 150px"
                placeholder="请输入要随机的菜数"
                clearable
              />&nbsp;&nbsp;<el-button @click="confilmAmount"
                >随机菜数</el-button
              >&nbsp;<el-button @click="totalBtn">显示总价</el-button>&nbsp;
            </div>
          </div>
          <!-- 自定义菜名显示 -->
          <div
            style="
              display: flex;
              justify-content: space-around;
              margin-top: 50px;
              flex-wrap: wrap;
              line-height: 40px;
              text-align: center;
              width: 800px;
            "
          >
            <div
              v-show="showCustom"
              v-for="(item, index) in newMenus"
              :key="index"
            >
              <img
                :src="item.url"
                style="height: 100px; width: 150px; border-radius: 10px"
              />
              <div>
                {{ item.menuName }}
                <span style="color: red">￥{{ item.price }}元</span>
              </div>
            </div>
          </div>
          <!-- 显示总价  -->
          <div style="margin-left: 40%; margin-top: 20px" v-show="totalShow">
            价格共计:
            <span style="font-size: 22px; color: red; font-weight: bold"
              >￥{{ total }}元</span
            >
          </div>
          <!-- 显示名字 -->
          <div class="showMenuList">
            <span
              v-show="extractShow"
              v-for="(item, index) in menuNameList"
              :key="index"
            >
              {{ item.menuName }}、
            </span>
          </div>
        </div>
      </div>
      <!-- 标签3 -->
      <div v-show="tagShow3" class="tag3">
        <div class="page">
          <h3
            style="
              display: flex;
              justify-content: center;
              padding-top: 20px;
              color: brown;
            "
          >
            使用说明
          </h3>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  addOrderlistmenu,
  delOrderlistmenu,
  listOrderlistmenu,
  listOrderAllInfomenu,
} from "/src/utils/menu.js";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import router from "../../../router";

//总条数
const totalLimit = ref(10);

const handleSizeChange = (val) => {
  queryArr.value.pageSize = val;
  getList();
};

const handleCurrentChange = (val) => {
  queryArr.value.pageNum = val;
  getList();
};

const formRef = ref("");

const activeIndex = ref("1");

// 是否显示自定义菜单
let showCustom = ref(false);

// 手动添加菜数
const amount = ref("");

// 最大人数范围
const menusMax = ref(0);

// 菜单是否显示
let showMenu = ref(false);

// 添加菜之后的数组
const newMenus = ref([]);

// 自定义菜的总价格
let total = ref(0);

// 是否显示自定义菜
let totalShow = ref(false);

// 查看的绑定参数
const querylist = ref([]);

// 显示查看菜单弹窗
const dialogTableVisible = ref(false);

// 查看list
function looklist() {
  dialogTableVisible.value = true;
  getList();
}

// 添加按钮的请求数据
const numberValidateForm = ref({
  menuName: "",
  url: "",
  price: "",
});

// 提交
const submitForm = (formRef) => {
  if (!formRef) return;
  formRef.validate((valid) => {
    if (valid) {
      addOrderlistmenu(numberValidateForm.value).then(() => {
        ElMessage({
          message: "添加成功.",
          type: "success",
        });
      });
    } else {
      console.log("提交失败!");
      return false;
    }
  });
};

// 重置
const resetForm = (formRef) => {
  if (!formRef) return;
  formRef.resetFields();
};

// 删除此项菜单
function deleteMenu(e) {
  delOrderlistmenu(e.row.id).then(() => {
    ElMessage({
      message: "删除成功.",
      type: "success",
    });
    looklist();
  });
}

// 查看的请求参数
const queryArr = ref({
  pageNum: 1,
  pageSize: 10,
  menuName: "",
  url: "",
  price: "",
});

// 获取数据
function getList() {
  listOrderlistmenu(queryArr.value).then((response) => {
    querylist.value = response.rows;
    // 获取总条数
    totalLimit.value = response.total;
  });
}

// 随机菜数
async function confilmAmount() {
  let res = await listOrderAllInfomenu();
  querylist.value = res.data;
  totalShow.value = false;
  extractShow = true;
  if (amount.value == "") {
    ElMessage({
      message: "随机菜数不能为空.",
      type: "warning",
    });
  }
  // 输入的数量，赋值给变量
  menusMax.value = amount.value;
  newMenus.value = Array.from(
    querylist.value.sort(() => Math.random() - 0.5).slice(0, menusMax.value)
  );

  for (let i = 0; i < newMenus.value.length; i++) {
    menuNameList.value[i] = newMenus.value[i];
  }
  if (amount.value == "") {
    extractShow = false;
  }

  // 菜数显示
  showCustom.value = true;

  totalShow.value = false;
}

// 查看总价
function totalBtn() {
  total.value = 0;
  totalShow.value = false;

  for (let i = 0; i < menusMax.value; i++) {
    total.value += newMenus.value[i].price;
  }
  totalShow.value = true;
  showMenu.value = false;
}

const menuNameList = ref([]);
let extractShow = false;

onMounted(() => {
  // 默认选择第一个标签
  tagShow1.value = true;
});

let tagShow1 = ref(false);
let tagShow2 = ref(false);

// 选择导航的显示
const handleSelect = (key) => {
  if (key == 1) {
    tagShow1.value = true;
    tagShow2.value = false;
  } else if (key == 2) {
    tagShow1.value = false;
    tagShow2.value = true;
  }
};

// 说明按钮
function explain() {
  // 路由跳转
  router.push("/ex/explain");
}
</script>

<style scoped>
ul {
  list-style: none;
}

.swiper {
  display: flex;
  margin-top: 20px;
}

.el-menu-demo {
  display: flex;
  justify-content: center;
}

.main {
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.tag1,
.tag2,
.tag3 {
  display: flex;
  justify-content: center;
}

.page {
  height: 100vh;
  width: 100%;
}

.showMenuList {
  margin-top: 30px;
  margin-left: 20px;
  height: 50px;
  width: 800px;
  display: flex;
}

/* @media screen and (max-width: 300px){

} */
</style>
