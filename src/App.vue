<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "App",
  setup() {
    const { proxy } = getCurrentInstance(); // 获取上下文实例，proxy=vue2的this
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu-item.is-active {
  background-color: #1890ff;
}
:root {
  --el-color-primary: green;
}
</style>
