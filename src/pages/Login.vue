<template>
  <div class="login-container">
    <div class="login-box">
      <h3>paas后台管理系统</h3>
      <el-form :model="loginInfo" :rules="rules" ref="loginInfo">
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="loginInfo.name"
            placeholder="请输入用户名"
          >
            <template><i class="el-icon-user-solid"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../request/user'
export default {
  data() {
    return {
      loginInfo: {
        name: "admin",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginInfo.validate((valid) => {
        if (valid) {
          login(this.loginInfo)
            .then((res) => {
              localStorage.setItem("paasUserLoginInfo", JSON.stringify(res.data));
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$router.push("/");
            })
            .catch((error) => {
              this.$message({
                message: error.message || error.error,
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #409eff;
  .login-box {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 30px;
    h3 {
      text-align: center;
      color: #409eff;
      margin: 40px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>