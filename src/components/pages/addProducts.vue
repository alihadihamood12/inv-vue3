<template>

<div class="form-box">
  <h2>➕ إضافة منتج جديد</h2>
    <div class="form-box-div">
    <div class="form-row a">
      <label>اسم المنتج:</label>
      <input v-model="formData.name" type="text" name="name" required>
    </div>

    <div class="form-row b">
      <label>القسم:</label>
        <input v-model="formData.category" name="category" required>
    </div>

    <div class="form-row c">
      <label>سعر الشراء:</label>
      <input v-model="formData.priceIn" type="number" name="priceIn" step="0.01" required>
    </div>

    <div class="form-row d">
      <label>سعر البيع:</label>
      <input v-model="formData.priceOut" type="number" name="priceOut" step="0.01" required>
    </div>

    <div class="form-row e">
      <label>الكمية:</label>
      <input v-model="formData.qty" type="number" name="qty" required>
    </div>

    <div class="form-row h">
      <label>تاريخ الانتهاء:</label>
      <input v-model="formData.expiryDate" type="date" name="expiryDate">
    </div>

    <div class="form-row i">
      <label>صورة المنتج:</label>
	  <input type="file" id="imgInput" accept="image/*" required>
    </div>
	
	
	<div class="form-row j">
      <label>الباركود:</label>
      <template v-if="barcodeEnabled">
        <template v-if="barcodeMode === 'camera'">
          <input v-model="formData.barcode" type="text" name="barcode" ref="barcodeInput" required style="display:none;">
          <button type="button" @click="startScanner" id="scannerBTN">{{ scannerBtnText }}</button>
          <button type="button" v-if="scannerVisible" @click="closeScanner" id="closeBTN">اغلاق الكاميرا</button>
          <div id="scanner" v-show="scannerVisible" style="width:300px;"></div>
        </template>
        <template v-else>
          <input v-model="formData.barcode" type="text" name="barcode" ref="barcodeInput" required placeholder="اكتب أو امسح الباركود من القارئ">
        </template>
      </template>
      <template v-else>
        <input v-model="formData.barcode" type="text" name="barcode" ref="barcodeInput" required placeholder="الباركود" style="display:none;">
      </template>
    </div>
	
    </div>
    <button @click="submitForm()" class="form-submit">📦 إضافة المنتج</button>
</div>




</template>


<script setup>
import axios from 'axios';
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';

// الوصول إلى $api من globalProperties
const { appContext } = getCurrentInstance();
const API_BASE = appContext.config.globalProperties.$api;
// إعدادات الباركود من localStorage
const barcodeEnabled = ref(JSON.parse(localStorage.getItem('barcodeEnabled') || 'false'));
const barcodeMode = ref(localStorage.getItem('barcodeMode') || 'camera');

const formData = reactive({
  name: '',
  category: '',
  priceIn: 0,
  priceOut: 0,
  qty: 0,
  expiryDate: '',
  imgPath: '',
  barcode: ''
});

function submitForm() {
  axios.post(`${API_BASE}/products`, formData)
    .then(response => {
      alert('تم إضافة المنتج بنجاح!');
      // إعادة تعيين النموذج
      formData.name = '';
      formData.category = '';
      formData.priceIn = 0;
      formData.priceOut = 0;
      formData.qty = 0;
      formData.expiryDate = '';
      formData.imgPath = '';
      formData.barcode = '';
    })
    .catch(error => {
      console.error('حدث خطأ أثناء إضافة المنتج:', error);
      alert('فشل في إضافة المنتج. حاول مرة أخرى.');
    });
}



const scannerVisible = ref(false);
const scannerBtnText = ref('📷 امسح الباركود');
const scanner = ref(null);
const barcodeInput = ref(null);
let html5QrcodeScanner = null;

function startScanner() {
  scannerVisible.value = true;
  scannerBtnText.value = 'جاري المسح...';
    html5QrcodeScanner = new Html5Qrcode("scanner");
    html5QrcodeScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        formData.barcode = decodedText;
        scannerVisible.value = false;
        scannerBtnText.value = "تم مسح الكود، اعادة ؟";
        html5QrcodeScanner.stop();
      },
      (errorMessage) => {
        // يمكن تجاهل الأخطاء البسيطة
      }
    );
}

function closeScanner() {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.stop();
    scannerVisible.value = false;
    scannerBtnText.value = '📷 امسح الباركود';
  }
}

// تحديث الإعدادات عند العودة من صفحة الإعدادات
onMounted(() => {
  barcodeEnabled.value = JSON.parse(localStorage.getItem('barcodeEnabled') || 'false');
  barcodeMode.value = localStorage.getItem('barcodeMode') || 'camera';
});
</script>





<style scoped>
.form-box {
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  /* background-color: #2b2b2b; */
  background-color: rgba(45, 44, 44, 0.141);
  border: 2px solid #444;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  text-align: center;
}

.form-box h2 {
  color: #f1f1f1;
  margin-bottom: 20px;
  font-size: 22px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.form-row label {
  width: 140px;
  color: #f1f1f1;
  font-size: 15px;
  text-align: right;
}

.form-row input,
.form-row select {
  width: 220px;
  padding: 8px;
  background-color: #2f2f2f;
  border: 1px solid #555;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
}

.form-submit {
  padding: 10px 20px;
  font-weight: bold;
  background-color: #03a9f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.form-submit:hover {
  background-color: #0288d1;
}

.form-box-div{
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  max-width: 50%; 
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.a, .b{
  grid-row: div 2; /* أول سطر يحتوي عنصرين */
}
.c, .d, .e{
  grid-row: div 3; /* أول سطر يحتوي عنصرين */
}
.h, .i, .j{
  grid-row: div 4; /* أول سطر يحتوي عنصرين */
}

/* ...existing code... */

/* Responsive styles */
@media (max-width: 900px) {
  .form-box {
    max-width: 98vw;
    padding: 10px;
  }
  .form-box-div {
    grid-template-columns: repeat(2, 1fr);
    max-width: 90vw;
    gap: 8px;
  }
  .form-row label {
    width: 100px;
    font-size: 14px;
  }
  .form-row input, .form-row select {
    width: 98%;
    font-size: 13px;
    padding: 7px;
  }
  .form-box h2 {
    font-size: 1.1em;
  }
}

@media (max-width: 600px) {
  .form-box {
    max-width: 99vw;
    padding: 4vw 2vw;
  }
  .form-box-div {
    grid-template-columns: 1fr;
    max-width: 99vw;
    gap: 6px;
  }
  .form-row {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
  .form-row label {
    width: 100%;
    font-size: 13px;
    text-align: right;
  }
  .form-row input, .form-row select {
    width: 100%;
    font-size: 12.5px;
    padding: 6px;
  }
  .form-submit {
    width: 100%;
    font-size: 1em;
    padding: 10px 0;
  }
  .form-box h2 {
    font-size: 1em;
  }
}


</style>