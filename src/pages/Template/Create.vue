<template>
  <el-dialog
    title="创建模板"
    v-model="info.isShowCreate"
    width="30%"
    :close-on-click-modal="false"
    @closed="reset"
  >
    <el-form ref="formRef" label-position="top" :rules="rules" :model="form">
      <el-form-item label="模板名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入模板名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择环境" prop="paasEnvIndex">
        <el-select
          style="width: 100%"
          v-model="form.paasEnvIndex"
          placeholder="请选择环境"
          @change="envChange()"
        >
          <el-option
            v-for="(item, index) in paasEnvList"
            :key="index"
            :label="item.name"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择环境版本" prop="paasVersionIndex">
        <el-select
          style="width: 100%"
          v-model="form.paasVersionIndex"
          placeholder="请选择环境版本"
          @change="versionChange()"
        >
          <el-option
            v-for="(item, index) in paasEnvChildList"
            :key="index"
            :label="item.name"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导入模板文件（单文件zip格式）" prop="source">
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          :limit="1"
          :on-change="fileChange"
          :auto-upload="false"
        >
          <el-button class="btn-upload" :icon="Upload" type="primary"
            >上传文件</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="info.isShowCreate = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import { environmentsList, addTemplate } from '../../request/template'
export default {
  props: ["info"],
  components: {
    Upload,
  },
  emits: ["getTemplateList"],
  setup(props, { emit }) {
    const { proxy: _this } = getCurrentInstance();
    const state = reactive({
      form: {
        name: "",
        paasEnvIndex: "",
        paasVersionIndex: "",
      },
      rules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        paasEnvIndex: [
          { required: true, message: "请选择环境", trigger: "change" },
        ],
        paasVersionIndex: [
          { required: true, message: "请选择环境版本", trigger: "change" },
        ],
      },
      paasEnvList: [],
      paasEnvList: [],
      paasEnvChildList: [],
      file: null,
      paasVersionId: "",
    });
    const submit = () => {
      _this.$refs.formRef.validate((valid) => {
        if (valid) {
          var formdata = new FormData();
          formdata.append("name", state.form.name);
          formdata.append("envId", state.paasVersionId);
          formdata.append("file", state.file);
          addTemplate(formdata)
            .then((res) => {
              ElMessage({
                message: "创建成功",
                type: "success",
              });
              emit("getTemplateList");
              props.info.isShowCreate = false;
            })
            .catch((error) => {
              ElMessage({
                message: error.error,
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    const getPaasEnvironments = () => {
      environmentsList().then((res) => {
        state.paasEnvList = res.data;
      });
    };
    getPaasEnvironments();
    const reset = () => {
      state.form = {
        name: "",
        paasEnvIndex: "",
        paasVersionIndex: "",
      };
    };
    const fileChange = (file) => {
      const arr = file.name.split(".");
      const isZIP = arr[arr.length - 1] === "zip";

      if (!isZIP) {
        _this.$refs.upload.clearFiles();
        state.file = null;
        return ElMessage.error("目前只支持上传ZIP格式，请重新上传!");
      }
      state.file = file.raw;
    };
    const envChange = () => {
      state.form.environment = state.paasEnvList[state.form.paasEnvIndex].name;
      state.paasEnvChildList =
        state.paasEnvList[state.form.paasEnvIndex].versionList;
    };
    const versionChange = () => {
      state.form.version =
        state.paasEnvChildList[state.form.paasVersionIndex].name;
      state.paasVersionId =
        state.paasEnvChildList[state.form.paasVersionIndex].id;
    };
    return {
      ...toRefs(state),
      submit,
      Upload,
      reset,
      fileChange,
      envChange,
      versionChange,
    };
  },
};
</script>
<style lang='scss' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px dashed #8c939d;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.codezone {
  display: flex;
  width: 100%;
  .el-input {
    flex: 1;
    :deep(.el-input__inner[readonly]) {
      background-color: whitesmoke;
    }
  }
  .btn {
    margin-left: 10px;
  }
}
.btn-upload {
  margin-left: 10px;
}
</style>