<template>
  <el-container>
    <el-aside :width="isCollapse ? '60px' : '226px'">
      <h3 class="logo">paas管理平台</h3>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#000d17"
        text-color="#fff"
        active-text-color="#fff"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-sub-menu index="2">
          <template #title>
            <el-icon><money /></el-icon>
            <span>模板管理</span>
          </template>
          <el-menu-item index="/template">模板列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <el-button class="btn" @click="isCollapse = !isCollapse">
            <el-icon v-if="isCollapse" :size="20"><expand /></el-icon>
            <el-icon v-else :size="20"><fold /></el-icon>
          </el-button>
          <el-breadcrumb>
            <el-breadcrumb-item>{{ $route.meta.p_title }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              管理员
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Expand, ArrowDown, Money, Fold } from "@element-plus/icons-vue";
import { reactive, onMounted, toRefs, computed } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    Expand,
    ArrowDown,
    Money,
    Fold,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      isCollapse: false,
      username: "",
    });
    onMounted(() => {});
    const logout = () => {
      localStorage.removeItem("paasUserLoginInfo");
      router.push("/login");
    };
    return {
      ...toRefs(state),
      logout,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
  justify-content: space-between;
}

.el-aside {
  background-color: #001529;
  color: #fff;
  user-select: none;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-weight: 400;
  letter-spacing: 3px;
}
.el-menu {
  border: 0;
  :deep(.el-menu-item.is-active) {
    background-color: #1890ff;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.left {
  display: flex;
  align-items: center;
}
.right {
  display: flex;
  align-items: center;
}
.btn {
  margin-right: 10px;
}
.publish-count {
  padding: 0px 7px;
  background-color: #fff;
  color: #1890ff;
  height: 16px;
  line-height: normal;
  margin-left: 5px;
  border-radius: 8px;
  font-weight: bold;
}
</style>
