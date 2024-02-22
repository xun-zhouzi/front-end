<template>
  <div>
    <el-menu
      class="el-menu-demo"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item style="width: 240px" index="1">新增店铺</el-menu-item>
      <el-menu-item style="width: 240px" index="2">随机星期</el-menu-item>
      <el-menu-item style="width: 240px" index="3">随机单次</el-menu-item>
    </el-menu>
    <!-- 标签1 -->
    <div v-show="tag1" class="tag1">
      <div>
        <el-form
          ref="formRef"
          :model="addParams"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 400px; margin-left: 35%"
        >
          <el-form-item
            label="店铺名"
            prop="shopName"
            :rules="[{ required: true, message: '店铺名不能为空' }]"
          >
            <el-input
              v-model="addParams.shopName"
              type="text"
              autocomplete="off"
              placeholder="例：张亮麻辣烫"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)"
              >添加</el-button
            >
            <el-button @click="resetForm(formRef)">重置</el-button>
            <el-button @click="lookShopList" style="margin-left: 10px"
              >查看</el-button
            ></el-form-item
          ><br />
        </el-form>
      </div>
      <!-- 查看  -->
      <el-dialog v-model="dialogTableVisible" title="店铺详情">
        <el-table :data="shoplist">
          <el-table-column property="id" label="索引" width="100" />
          <el-table-column property="shopName" label="店名" />
          <el-table-column label=" 操 作" class="custom-header">
            <template #default="scope">
              <div>
                <el-button :plain="true" size="small" @click="deleteShop(scope)"
                  >删除</el-button
                >&nbsp;

                <el-button size="small" @click="updateShop(scope)"
                  >编辑</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 弹出修改页面 -->
        <el-dialog v-model="updateShow" title="修改详情" width="500">
          <el-form
            :model="queryUpdate"
            label-width="100px"
            class="demo-ruleForm"
            style="width: 400px"
          >
            <el-form-item label="索引" prop="id">
              <el-input
                v-model="queryUpdate.id"
                type="text"
                autocomplete="off"
                readonly
              />
            </el-form-item>
            <el-form-item
              label="店名"
              prop="shopName"
              :rules="[{ required: true, message: '店铺名不能为空' }]"
            >
              <el-input
                v-model="queryUpdate.shopName"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="saveUpdate(e)">保存</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-dialog>
    </div>

    <!-- 标签2  -->
    <div v-show="tag2" class="tag2">
      <el-button @click="randomShop" style="margin-left: 10px; width: 400px"
        >不知道吃谁家？点一下，我告诉你~</el-button
      ><br />
      <!-- 显示店名 -->
      <div v-show="shopShow">
        <ul v-for="(item, index) in shoplist" :key="index">
          <li v-if="index == 0">{{ `星期一：` + item.shopName }}</li>
          <li v-if="index == 1">{{ `星期二：` + item.shopName }}</li>
          <li v-if="index == 2">{{ `星期三：` + item.shopName }}</li>
          <li v-if="index == 3">{{ `星期四：` + item.shopName }}</li>
          <li v-if="index == 4">{{ `星期五：` + item.shopName }}</li>
        </ul>
      </div>
    </div>

    <!-- 标签3  -->
    <div v-show="tag3" class="tag3">
      <el-button style="margin-left: 10px" @click="probBtn">随机概率</el-button
      ><br />
      <div v-show="showPb">
        <ul v-for="(item, index) in shoplist" :key="index">
          <li>{{ item.shopName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  addOrderlistshop,
  listOrderlistshop,
  delOrderlistshop,
  updateOrderlistshop,
} from "/src/utils/shop.js";
import { ElMessage } from "element-plus";

const dialogTableVisible = ref(false);

const formRef = ref("");

const activeIndex = ref("1");
// 店铺详情是否弹出
let shopShow = ref(false);
// 修改页是否弹出
let updateShow = ref(false);

// 店铺列表请求参数
const queryParams = ref([
  {
    pageNum: 1,
    pageSize: 10,
    shopName: "",
  },
]);
// 双向绑定数组
const shoplist = ref([]);

// 添加请求参数
const addParams = ref({
  shopName: "",
});

// 查看店铺按钮
function lookShopList() {
  dialogTableVisible.value = true;
  getList();
}

// 获取数据方法
function getList() {
  listOrderlistshop(queryParams.value).then((response) => {
    shoplist.value = response.rows;
  });
}

// 添加
const submitForm = (formRef) => {
  if (!formRef) return;
  formRef.validate((valid) => {
    if (valid) {
      addOrderlistshop(addParams.value).then(() => {
        ElMessage({
          message: "添加成功.",
          type: "success",
        });
      });
    } else {
      console.log("添加失败!");
      return false;
    }
  });
};

// 重置
const resetForm = (formRef) => {
  if (!formRef) return;
  formRef.resetFields();
};

// 修改的请求参数
const queryUpdate = ref({
  id: "",
  shopName: "",
});

// 编辑按钮
function updateShop(e) {
  // 回显
  queryUpdate.value = e.row;
  // 弹出
  updateShow.value = true;
}

// 保存编辑
function saveUpdate() {
  updateOrderlistshop(queryUpdate.value).then(() => {
    ElMessage({
      message: "修改成功.",
      type: "success",
    });
  });
  updateShow.value = false;
  getList();
}
// 删除
function deleteShop(e) {
  delOrderlistshop(e.row.id).then(() => {
    ElMessage({
      message: "删除成功.",
      type: "success",
    });
    getList();
  });
}

// 随机
async function randomShop() {
  let res = await listOrderlistshop(queryParams.value);
  shoplist.value = res.rows;
  if (shoplist.value == "") {
    ElMessage({
      message: "请先添加随机店铺.",
      type: "warning",
    });
  }
  shoplist.value = Array.from(
    new Set(shoplist.value.sort(() => Math.random() - 0.5))
  );
  shopShow.value = true;
}

let showPb = ref(false);

// 鼠标点击事件
let btnCount = ref(0);

// 随机概率
async function probBtn() {
  btnCount.value++;
  let res = await listOrderlistshop(queryParams.value);
  shoplist.value = res.rows;
  if (shoplist.value == "") {
    ElMessage({
      message: "请先添加店铺名.",
      type: "warning",
    });
  }
  shoplist.value = Array.from(
    new Set(shoplist.value.sort(() => Math.random() - 0.5).slice(0, 1))
  );
  showPb.value = true;
}

onMounted(() => {
  // 默认选择第一个标签
  tag1.value = true;
});

let tag1 = ref(false);
let tag2 = ref(false);
let tag3 = ref(false);

// 选择导航的显示
const handleSelect = (key) => {
  if (key == 1) {
    tag1.value = true;
    tag2.value = false;
    tag3.value = false;
    shopShow.value = false;
    showPb.value = false;
  } else if (key == 2) {
    tag1.value = false;
    tag2.value = true;
    tag3.value = false;
    showPb.value = false;
  } else if (key == 3) {
    tag1.value = false;
    tag2.value = false;
    tag3.value = true;
    shopShow.value = false;
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.el-menu-demo {
  display: flex;
  justify-content: center;
}

.tag1 {
  margin-top: 3%;
}
.tag2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
}
.tag3 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
}
</style>