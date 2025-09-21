<template>
  <!-- <hr>
  <p style="font-size:0.9em;">نسخة تجريبية للنظام</p> -->
  <footer class="footer">
  <div style="margin-right: 50px;" class="footer-search">
    <p>قائمة الوصولات</p>
    <ul>
    <li><label for="receiptId">🔎 إدخال رقم عملية البيع:</label>
  <input v-model="receiptId" type="text" name="receiptId" id="receiptId" placeholder="اكتب رقم العملية..." required @keyup.enter="redir">
  <button @click="redir()">عرض الوصل</button>
    </li>
    <li><label for="">عرض جميع الوصولات</label>
      <RouterLink to="/reports"><button>اضغط هنا</button></RouterLink>
      
    </li>
    </ul>
  </div>

  <div class="footer-nav">
    <p>الصفحات الرئيسية</p>
    <ul style="margin-right: 60px;">
  <li><RouterLink to="/">🏠 الرئيسية</RouterLink></li>
  <li><RouterLink to="/products">📦 المنتجات</RouterLink></li>
  <li><RouterLink to="/addProducts">➕ إضافة منتج</RouterLink></li>
  <li><RouterLink to="/statements">📊 الإحصائيات</RouterLink></li>
  <li><RouterLink to="/notifications">🔔 الاشعارات</RouterLink></li>
  <li><RouterLink to="/profits">📈 الأرباح</RouterLink></li>
  <li><RouterLink to="/help">📘 المساعدة</RouterLink></li>
    </ul>
  </div>


  <div class="footer-nav">
    <p>هل تواجه مشكلة ؟</p>
    <small>
	أنا متواجد دائمًا لمساعدتك، تقدر تتواصل وياي بأي وقت 
	<br> على مدار الساعة. سواء كانت استفسارات، اقتراحات، أو مشاكل تقنية
	<br>—أنا هنا ٢٤/٧ حتى نخلي تجربتك أسهل وأفضل
	<a style="text-decoration: underline;" href="https://api.whatsapp.com/send?phone=9647761763665">اضغط هنا للتواصل معي</a></small>
  </div>

  <div class="footer-copy">
    <p>جميع الحقوق محفوظة © 2025 <a href="https://api.whatsapp.com/send?phone=9647761763665" target="_blank" style="text-decoration: underline;">علي هادي</a></p>
  </div>
</footer>
</template>


<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
const receiptId = ref('');
const router = useRouter();

// route /receipt/:id غير معرف حالياً في الراوتر، إذا أضفته لاحقاً أزل التعليق
function redir() {
  if (receiptId.value.trim() !== '') {
    const id = receiptId.value.trim();
    receiptId.value = '';
    router.push(`/receipt/${id}`);
  } else {
    alert('يرجى إدخال رقم العملية أولاً');
  }
}

</script>


<style scoped>

.footer {
  /* background-color: #1e1e1e; */
  background-color: #212121;
  color: #ccc;
  padding: 30px 20px;
  border-top: 2px solid #333;
  font-size: 14px;
  direction: rtl;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: start;
}

.footer-search {
  text-align: right;
}

.footer-search label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.footer-search input[type="text"] {
  width: 180px;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
  background-color: #2c2c2c;
  border: 1px solid #444;
  color: #fff;
}

.footer-search button {
  padding: 6px 12px;
  font-size: 13px;
  margin-right: 8px;
  background-color: #00c2ff;
  border: none;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
}

.footer-nav {
  text-align: right;
}

.footer-nav ul {
  /* list-style: none; */
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* يجعلها عمودية */
  gap: 8px;
}

.footer-nav a {
  color: #00c2ff;
  text-decoration: none;
  font-size: 13px;
}

.footer-copy {
  grid-column: span 5;
  text-align: center;
  margin-top: 30px;
  color: #888;
  font-size: 13px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .footer {
    width: 95%;
    grid-template-columns: 1fr;
    text-align: center;
  }
  .footer-copy {
    margin-top: 20px;
    grid-column: span 1;
  }

  /* القوائم والتنبيهات */
  .footer-nav ul,
  .alert-list,
  .profit-box,
  .form-box {
    width: 80%;
    margin: 15px auto;
  }
  
}

@media (max-width: 600px) {
  .footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 1vw;
    font-size: 0.95em;
    max-width: 99vw;
    width: 99vw;
  }
}

</style>

