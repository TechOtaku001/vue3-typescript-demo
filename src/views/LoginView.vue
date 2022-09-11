<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2 class="title">后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="login-btn" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { LoginData } from "../types/login";
import { FormInstance } from "element-plus";
import { login } from '../request/api'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "账号的长度在3到10之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "密码的长度在3到10之间",
          trigger: "blur",
        },
      ],
    };
    const ruleFormRef = ref<FormInstance>();
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
          router.push('/')
          // login(data.ruleForm).then((res) => {
          //   localStorage.setItem('token', res.data.token)
          //   router.push('/')
          // })
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return { ...toRefs(data), ruleFormRef, rules, resetForm, submitForm };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
  padding: 10px;
  text-align: center;
  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 20px;
  }
  .login-btn {
    width: 48%;
  }
  .title {
    margin-bottom: 40px;
  }
}
</style>