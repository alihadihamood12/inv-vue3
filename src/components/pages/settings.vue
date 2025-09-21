<template>
<Auth routePath="/settings">
  <div class="settings-box">
    <h2>⚙️ الإعدادات</h2>
    <div class="setting-row">
      <label for="barcode-enabled">استخدام الباركود:</label>
      <input type="checkbox" id="barcode-enabled" v-model="barcodeEnabled" @change="saveBarcodeSettings" />
    </div>
    <div v-if="barcodeEnabled" class="setting-row">
        <select id="barcode-mode" v-model="barcodeMode" @change="saveBarcodeSettings">
            <option value="camera">مسح الباركود باستخدام الكاميرا</option>
            <option value="reader">مسح الباركود من خلال القارئ</option>
        </select>
        <label for="barcode-mode">:طريقة مسح الباركود</label>
    </div>
    <h3 style="color:#00c2ff; margin: 30px 0 10px;">🔒 كلمات مرور الصفحات</h3>
    <table class="password-table">
      <thead>
        <tr>
          <th>المسار (Route)</th>
          <th>كلمة المرور</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in passwords" :key="row.route">
          <td>{{ row.name }}</td>
          <td>
            <input type="text" v-model="row.password" @change="markDirty(idx)" />
          </td>
        </tr>
      </tbody>
    </table>
    <button class="save-btn" @click="savePasswords">💾 حفظ جميع كلمات المرور</button>
  </div>
</Auth>
</template>

<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import axios from 'axios';

// الوصول إلى $api
const { appContext } = getCurrentInstance();
const API_BASE = appContext.config.globalProperties.$api;

// إعدادات الباركود
const barcodeEnabled = ref(false);
const barcodeMode = ref('camera');

onMounted(() => {
  // تحميل إعدادات الباركود من localStorage
  const enabled = localStorage.getItem('barcodeEnabled');
  barcodeEnabled.value = enabled ? JSON.parse(enabled) : false;
  const mode = localStorage.getItem('barcodeMode');
  barcodeMode.value = mode || 'camera';
  fetchPasswords();
});

const passwords = ref([]);
const dirtyRows = ref([]);

async function fetchPasswords() {
  try {
    const res = await axios.get(`${API_BASE}/settings`);
    if (res.data && Array.isArray(res.data.passwords)) {
      passwords.value = res.data.passwords.map(row => ({ ...row }));
    }
  } catch (e) {
    passwords.value = [];
  }
}

function markDirty(idx) {
  if (!dirtyRows.value.includes(idx)) dirtyRows.value.push(idx);
}

async function savePasswords() {
  try {
    await axios.patch(`${API_BASE}/settings`, { passwords: passwords.value });
    dirtyRows.value = [];
    alert('تم حفظ كلمات المرور بنجاح!');
  } catch (e) {
    alert('حدث خطأ أثناء الحفظ!');
  }
}

function saveBarcodeSettings() {
  localStorage.setItem('barcodeEnabled', JSON.stringify(barcodeEnabled.value));
  localStorage.setItem('barcodeMode', barcodeMode.value);
}

watch(barcodeEnabled, saveBarcodeSettings);
watch(barcodeMode, saveBarcodeSettings);
</script>


<style scoped>
.settings-box {
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  background-color: rgba(45, 44, 44, 0.141);
  border: 2px solid #444;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  text-align: center;
  max-width: 500px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.setting-row label {
  color: #fff;
  font-weight: bold;
  margin-left: 10px;
  min-width: 120px;
  text-align: right;
}
.setting-row input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.2);
}
.setting-row select {
  background: #222;
  color: #fff;
  border: 1px solid #00c2ff;
  border-radius: 6px;
  padding: 4px 12px;
  margin-right: 10px;
  font-size: 1em;
}
.settings-box h2 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 22px;
}
.password-table {
  width: 100%;
  margin: 18px 0;
  border-collapse: collapse;
}
.password-table th, .password-table td {
  padding: 10px 8px;
  border: 1px solid #444;
  text-align: center;
  color: #eee;
  background: rgba(255,255,255,0.04);
}
.password-table input[type="text"] {
  width: 120px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #bbb;
  background: #222;
  color: #fff;
  text-align: center;
}
.save-btn {
  margin-top: 18px;
  background: #03a9f4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.save-btn:hover {
  background: #0288d1;
}
/* Responsive styles */
@media (max-width: 900px) {
  .settings-box {
    max-width: 98vw;
    padding: 10px 2vw;
  }
  .setting-row {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .setting-row label {
    min-width: 0;
    width: 100%;
    font-size: 0.98em;
    margin-left: 0;
    margin-bottom: 4px;
    text-align: right;
  }
  .setting-row input[type="checkbox"], .setting-row select {
    width: 100%;
    font-size: 0.98em;
  }
  .settings-box h2 {
    font-size: 1.1em;
  }
  .password-table th, .password-table td {
    font-size: 0.98em;
    padding: 7px 4px;
  }
  .password-table input[type="text"] {
    width: 90vw;
    font-size: 0.98em;
    padding: 6px 2vw;
  }
  .save-btn {
    width: 100%;
    font-size: 1em;
    padding: 10px 0;
  }
}
@media (max-width: 600px) {
  .settings-box {
    max-width: 99vw;
    padding: 4vw 1vw;
  }
  .setting-row {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
  .setting-row label {
    min-width: 0;
    width: 100%;
    font-size: 0.95em;
    margin-left: 0;
    margin-bottom: 2px;
    text-align: right;
  }
  .setting-row input[type="checkbox"], .setting-row select {
    width: 100%;
    font-size: 0.95em;
  }
  .settings-box h2 {
    font-size: 1em;
  }
  .password-table th, .password-table td {
    font-size: 0.95em;
    padding: 5px 2px;
  }
  .password-table input[type="text"] {
    width: 98vw;
    font-size: 0.95em;
    padding: 5px 1vw;
  }
  .save-btn {
    width: 100%;
    font-size: 0.98em;
    padding: 8px 0;
  }
}

</style>
