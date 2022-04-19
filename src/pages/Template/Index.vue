<template>
  <div>
    <el-card class="card-main">
      <div class="btn-main">
        <h3 class="title">模板列表</h3>
        <el-button type="primary" @click="create" :icon="CirclePlus">
          新增
        </el-button>
      </div>
      <el-divider></el-divider>
      <div>
        <el-table
          :data="templatesData"
          style="width: 100%"
          ref="multipleTable1"
        >
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="模板名称"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <Create
      :info="info"
      ref="createModel"
      @getTemplateList="getTemplateList"
    />
  </div>
</template>

<script>
import { CirclePlus } from "@element-plus/icons-vue";
import { reactive, onMounted, toRefs, getCurrentInstance } from "vue";
import {
  templatesList
} from "../../request/template";
import { useRouter } from "vue-router";
import Create from "./Create";
export default {
  components: {
    CirclePlus,
    Create,
  },
  setup() {
    const { proxy: _this } = getCurrentInstance();
    const router = useRouter();
    const state = reactive({
      info: {
        isShowCreate: false,
      },
      templatesData: [],
    });
    onMounted(() => {});
    const create = () => {
      _this.info.isShowCreate = true;
    };
    const getTemplateList = () => {
      templatesList().then((res) => {
        state.templatesData = res.data
      });
    };
    getTemplateList();
    return {
      ...toRefs(state),
      create,
      getTemplateList,
      CirclePlus
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