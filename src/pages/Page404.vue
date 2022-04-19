<template>
  <div class="main">
    <div class="not-found">404</div>
    <div class="description">找不到页面!</div>
    <el-button class="btn" type="primary" plain @click="$router.push('/')"
      >返回主页</el-button
    >
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  components: {},
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .not-found {
    font-size: 200px;
    text-align: center;
    font-weight: bold;
  }
  .description {
    text-align: center;
    font-size: 14px;
  }
  .btn {
    width: 100%;
    height: 44px;
    margin-top: 20px;
  }
}
</style>
