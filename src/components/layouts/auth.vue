<template>
  <div>
    <div v-if="isPasswordRequired && !isAuthenticated" class="password-modal">
      <div class="password-modal-content">
        <h3>🔒 كلمة مرور الصفحة</h3>
        <input v-model="inputPassword" type="password" placeholder="ادخل كلمة المرور" @keyup.enter="checkPassword" />
        <button @click="checkPassword">دخول</button>
        <div v-if="error" class="error-msg">{{ error }}</div>
      </div>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  routePath: { type: String, required: true }
});

const isAuthenticated = ref(false);
const inputPassword = ref('');
const error = ref('');
const isPasswordRequired = ref(false);
let pagePassword = '';

async function fetchPassword() {
  try {
    const res = await axios.get('http://localhost:3000/settings');
    if (res.data && Array.isArray(res.data.passwords)) {
      const found = res.data.passwords.find(row => row.route === props.routePath);
      pagePassword = found ? found.password : '';
      isPasswordRequired.value = !!pagePassword;
    } else {
      pagePassword = '';
      isPasswordRequired.value = false;
    }
  } catch (e) {
    pagePassword = '';
    isPasswordRequired.value = false;
  }
}

function checkPassword() {
  if (inputPassword.value === pagePassword) {
    isAuthenticated.value = true;
    error.value = '';
  } else {
    error.value = 'كلمة المرور غير صحيحة!';
  }
}

onMounted(fetchPassword);
watch(() => props.routePath, fetchPassword);
</script>

<style scoped>
.password-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.password-modal-content {
  background: rgba(40,40,40,0.98);
  border-radius: 16px;
  padding: 32px 28px 24px 28px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  text-align: center;
  min-width: 320px;
}
.password-modal-content h3 {
  color: #fff;
  margin-bottom: 18px;
}
.password-modal-content input[type="password"] {
  width: 80%;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1.5px solid #b3b3b3;
  background: rgba(255,255,255,0.18);
  color: #fff;
  font-size: 1.1em;
  margin-bottom: 14px;
  outline: none;
  text-align: center;
}
.password-modal-content button {
  background: #03a9f4;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.password-modal-content button:hover {
  background: #0288d1;
}
.error-msg {
  color: #f44336;
  margin-top: 10px;
  font-weight: bold;
}
</style>
