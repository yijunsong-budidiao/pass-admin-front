<template>
  <div>
    <el-card class="card-main">
      <div class="btn-main">
        <h3 class="title">代码列表</h3>
      </div>
      <el-divider></el-divider>
      <div>
        <el-table :data="codesData" style="width: 100%" ref="multipleTable1">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="代码名称"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { CirclePlus } from "@element-plus/icons-vue";
import { reactive, onMounted, toRefs, getCurrentInstance } from "vue";
import { codesList } from "../../request/code";
import { useRouter } from "vue-router";
export default {
  components: {
    CirclePlus,
  },
  setup() {
    const { proxy: _this } = getCurrentInstance();
    const router = useRouter();
    const state = reactive({
      codesData: [],
    });
    onMounted(() => {});
    const getCodeList = () => {
      codesList().then((res) => {
        state.codesData = res.data;
      });
    };
    getCodeList();
    return {
      ...toRefs(state),
      CirclePlus,
    };
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.btn-main {
  display: flex;
  justify-content: space-between;
  .title {
    font-weight: bold;
    font-size: 16px;
  }
}
.img {
  width: 50px;
}
</style>
