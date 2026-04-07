<template>
  <div class="login-page">
    <div class="login-panel">
      <h3 class="login-title">缘·云香后台管理系统</h3>

      <el-form ref="formRef" :model="form" :rules="rules" class="login-form" @submit.prevent>
        <el-form-item prop="username">
          <el-input v-model="form.username" size="large" placeholder="账号">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" size="large" show-password placeholder="密码" @keyup.enter="handleSubmit">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="rememberMe" class="remember-box">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" size="large" class="login-button" @click="handleSubmit">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">Copyright © 2023-2025 undsky.com All Rights Reserved.</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Lock, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { login } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const formRef = ref();
const rememberMe = ref(true);
const form = reactive({
  username: 'admin',
  password: 'admin123'
});

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

function handleSubmit() {
  formRef.value.validate((valid) => {
    if (!valid) return;
    if (form.username !== 'admin' || form.password !== 'admin123') {
      ElMessage.error('演示环境仅支持 admin / admin123 登录');
      return;
    }
    login(form);
    const redirect = route.query.redirect || '/index';
    router.push(String(redirect));
  });
}
</script>
