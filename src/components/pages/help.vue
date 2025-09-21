<template>
<div class="docs-container">
  <aside class="docs-sidebar">
    <h3>📚 دليل المزايا</h3>
    <ul>
      <li :class="{ active: activeSection === 'add' }" @click="activeSection = 'add'">➕ إضافة منتج جديد</li>
      <li :class="{ active: activeSection === 'sell' }" @click="activeSection = 'sell'">🛒 البيع السريع</li>
      <li :class="{ active: activeSection === 'invoice' }" @click="activeSection = 'invoice'">📑 الفاتورة المصورة</li>
      <li :class="{ active: activeSection === 'search' }" @click="activeSection = 'search'">🔍 البحث عن المنتجات</li>
      <li :class="{ active: activeSection === 'stats' }" @click="activeSection = 'stats'">📊 الإحصائيات</li>
      <li :class="{ active: activeSection === 'profit' }" @click="activeSection = 'profit'">📈 الأرباح والخسارة</li>
      <li :class="{ active: activeSection === 'report' }" @click="activeSection = 'report'">📅 التقارير</li>
      <li :class="{ active: activeSection === 'alerts' }" @click="activeSection = 'alerts'">🔔 التنبيهات</li>
      <li :class="{ active: activeSection === 'colors' }" @click="activeSection = 'colors'">🟢 دليل الألوان</li>
      <li :class="{ active: activeSection === 'auto' }" @click="activeSection = 'auto'">⚙️ التحديث التلقائي</li>
      <li :class="{ active: activeSection === 'receipt' }" @click="activeSection = 'receipt'">📮 عرض وصل البيع</li>
    </ul>
  </aside>

  <main class="docs-content">
    <!-- إضافة منتج -->
    <div v-if="activeSection === 'add'" class="doc-section active">
      <h2>➕ إضافة منتج جديد</h2>
      <p>تستخدم هذه الصفحة لتسجيل أي منتج جديد في المخزون مع جميع تفاصيله (الاسم، القسم، الأسعار، الكمية، تاريخ الانتهاء، الصورة).</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>من القائمة الجانبية اختر "إضافة منتج جديد".</li>
        <li>املأ الحقول المطلوبة: اسم المنتج، القسم، سعر الشراء، سعر البيع، الكمية، تاريخ الانتهاء (اختياري)، صورة المنتج (اختياري).</li>
        <li>اضغط "📦 إضافة المنتج" ليتم حفظه فورًا في الجرد.</li>
        <li>إذا كان المنتج موجود مسبقًا بنفس الاسم والقسم، سيتم دمج الكمية وتحديث الأسعار تلقائيًا.</li>
      </ul>
    </div>

    <!-- البيع السريع -->
    <div v-else-if="activeSection === 'sell'" class="doc-section active">
      <h2>🛒 البيع السريع</h2>
      <p>ميزة لإتمام عملية البيع مباشرة من بطاقة المنتج في صفحة الجرد بدون إدخال بيانات إضافية.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>من صفحة الجرد اضغط زر "بيع" على المنتج المطلوب.</li>
        <li>اختر الكمية وأكد العملية.</li>
        <li>سيتم خصم الكمية من المخزون وتسجيل البيع مع إمكانية عرض الفاتورة المصورة.</li>
      </ul>
    </div>

    <!-- الفاتورة المصورة -->
    <div v-else-if="activeSection === 'invoice'" class="doc-section active">
      <h2>📑 الفاتورة المصورة</h2>
      <p>يعرض النظام الفاتورة على شكل صورة PNG جاهزة للطباعة أو الإرسال، بدل ملفات PDF.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>بعد البيع السريع، اضغط "عرض الفاتورة".</li>
        <li>ستظهر صورة تحتوي شعار المتجر، تفاصيل الطلب، التاريخ والوقت.</li>
        <li>يمكنك حفظ الصورة أو طباعتها مباشرة.</li>
      </ul>
    </div>

    <!-- البحث -->
    <div v-else-if="activeSection === 'search'" class="doc-section active">
      <h2>🔍 البحث عن المنتجات</h2>
      <p>شريط البحث في أعلى صفحة الجرد يتيح لك إيجاد المنتجات فورًا أثناء الكتابة.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>اكتب اسم المنتج أو جزء منه.</li>
        <li>ستظهر النتائج المطابقة مباشرة.</li>
        <li>يمكنك أيضًا البحث عبر مسح الباركود الخاص بالمنتج.</li>
      </ul>
    </div>

    <!-- الإحصائيات -->
    <div v-else-if="activeSection === 'stats'" class="doc-section active">
      <h2>📊 الإحصائيات</h2>
      <p>صفحة تعرض ملخص حالة المخزون: الكميات المنخفضة، المنتجات المنتهية أو القريبة من الانتهاء، والمنتجات الراكدة.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>من القائمة الجانبية اختر "الإحصائيات".</li>
        <li>اضغط على أي منتج في القوائم للانتقال إليه في صفحة الجرد.</li>
      </ul>
    </div>

    <!-- الأرباح والخسارة -->
    <div v-else-if="activeSection === 'profit'" class="doc-section active">
      <h2>📈 الأرباح والخسارة</h2>
      <p>صفحة مالية تعرض إجمالي المصروفات، إجمالي المبيعات، والربح أو الخسارة.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>من القائمة العلوية اختر "الأرباح والخسارة".</li>
        <li>سترى جدول بالأرقام مع تلوين الربح بالأخضر والخسارة بالأحمر.</li>
      </ul>
    </div>

    <!-- التقارير -->
    <div v-else-if="activeSection === 'report'" class="doc-section active">
      <h2>📅 التقارير</h2>
      <p>يمكنك استخراج تقرير أسبوعي أو شهري للمبيعات على شكل ملف PDF منسق باللغة العربية.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>من القائمة اختر "التقارير".</li>
        <li>اختر نوع التقرير (أسبوعي أو شهري).</li>
        <li>سيتم تحميل ملف PDF يحتوي تفاصيل المبيعات والإجمالي.</li>
      </ul>
    </div>

    <!-- التنبيهات -->
    <div v-else-if="activeSection === 'alerts'" class="doc-section active">
      <h2>🔔 التنبيهات</h2>
      <p>تعرض لك المنتجات التي تحتاج انتباهك: قرب النفاد، منتهية الصلاحية، راكدة، جديدة، أو نافذة من المخزون.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>من القائمة اختر "التنبيهات".</li>
        <li>ستظهر قائمة ملونة حسب نوع التنبيه.</li>
        <li>يمكنك تعديل مدة اعتبار المنتج راكد من نفس الصفحة.</li>
      </ul>
    </div>

    <!-- دليل الألوان -->
    <div v-else-if="activeSection === 'colors'" class="doc-section active">
      <h2>🟢 دليل الألوان</h2>
      <p>الألوان تشير لحالة المنتج في الجرد:</p>
      <ul>
        <li>🟢 متوفر</li>
        <li>🟡 قرب النفاد</li>
        <li>🔴 نافد</li>
      </ul>
    </div>

    <!-- التحديث التلقائي -->
    <div v-else-if="activeSection === 'auto'" class="doc-section active">
      <h2>⚙️ التحديث التلقائي</h2>
      <p>عند إضافة منتج موجود مسبقًا بنفس الاسم والقسم، يتم دمج الكمية وتحديث الأسعار تلقائيًا.</p>
    </div>

    <!-- عرض وصل البيع -->
        <div v-else-if="activeSection === 'receipt'" class="doc-section active">
      <h2>📮 عرض وصل البيع</h2>
      <p>يمكنك الوصول لأي عملية بيع سابقة مباشرة عن طريق إدخال رقم العملية، وسيعرض لك النظام الوصل المصور الخاص بها.</p>
      <h3>طريقة الاستخدام</h3>
      <ul>
        <li>انتقل إلى أسفل أي صفحة في النظام.</li>
        <li>في خانة "📮 إدخال رقم عملية البيع"، اكتب رقم العملية (مثال: <b>1051</b>).</li>
        <li>اضغط "عرض الصورة".</li>
        <li>سيتم فتح صفحة تعرض صورة الوصل كاملة، تشمل تفاصيل العملية، المنتج، السعر، والتاريخ.</li>
      </ul>
      <p>🔒 لا تحتاج لتسجيل دخول إضافي أو خطوات معقدة — فقط رقم العملية يكفي.<br>
         📤 يمكنك حفظ أو طباعة الوصل مباشرة من الصفحة المعروضة.</p>
    </div>
  </main>
</div>
</template>


<script setup>
import { ref } from 'vue';
const activeSection = ref('add');
</script>




<style scoped>
.docs-container {
    margin-top: 50px;
  display: flex;
  gap: 30px;
  padding: 30px;
  /* background-color: #1d1d1d; */
    background-color: rgba(0, 0, 0, 0.141);
  direction: rtl;
}

.docs-sidebar {
  width: 230px;
  /* background-color: #2c2c2c; */
    background-color: rgba(255, 255, 255, 0.072);
  border: 2px solid #444;
  border-radius: 8px;
  padding: 20px;
  color: #fff;
  height: fit-content;
  text-align: right;
}

.docs-sidebar h3 {
  margin-bottom: 15px;
  color: #00c2ff;
  font-size: 18px;
  text-align: right;
}

.docs-sidebar ul {
  list-style: none;
  padding-left: 0;
  text-align: right;
}

.docs-sidebar li {
  margin: 10px 0;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.3s;
  text-align: right;
}

.docs-sidebar li:hover {
  background-color: #00c2ff33;
}

.docs-content {
  flex: 1;
  /* background-color: #2b2b2b; */
      background-color: rgba(255, 255, 255, 0.072);
  border: 2px solid #444;
  border-radius: 8px;
  padding: 20px;
  color: #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  text-align: right;
  direction: rtl;
  z-index: 0;
}

.doc-section {
  display: none;
   text-align: right;
  direction: rtl;
}
.doc-section.active {
  display: block;
}

.doc-section h2 {
  color: #00c2ff;
  margin-bottom: 15px;
}
.docs-sidebar li.active {
  background-color: #00c2ff55;
  color: #fff;
  font-weight: bold;
  border-left: 4px solid #00c2ff;
}

.doc-section h3 {
  max-width: 30%;
  font-size: 26px;
  color: #00c2ff;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 0 6px #00c2ff88;
  border-bottom: 2px solid #00c2ff44;
  padding-bottom: 8px;
}

/* .doc-section h2, */
.doc-section h3,
.doc-section p,
.doc-section ul {
  text-align: right;
  direction: rtl;
}
.chart-container {
  width: 100%;
  height: 400px;
  margin: 30px auto;
  background-color: #2e2e2e;
  border: 2px solid #444;
  border-radius: 10px;
  padding: 20px;
}
/* Responsive styles */
@media (max-width: 900px) {
  .docs-container {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .docs-sidebar {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 0.98em;
  }
  .docs-content {
    padding: 10px;
    font-size: 0.98em;
  }
  .doc-section h2, .doc-section h3 {
    font-size: 1.1em;
  }
}
@media (max-width: 600px) {
  .docs-container {
    flex-direction: column;
    gap: 4px;
    padding: 4vw 1vw;
  }
  .docs-sidebar {
    width: 100%;
    margin-bottom: 6px;
    padding: 6px;
    font-size: 0.95em;
  }
  .docs-content {
    padding: 6px;
    font-size: 0.95em;
  }
  .doc-section h2, .doc-section h3 {
    font-size: 1em;
  }
  .chart-container {
    height: 180px;
    padding: 6px;
  }
}
/* Responsive styles */
@media (max-width: 900px) {
  .alert-list {
    width: 95vw;
    padding: 10px 2vw;
  }
  .alert-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    font-size: 0.98em;
    padding: 10px 8px;
  }
  .alert-text {
    font-size: 15px;
  }
  .alert-date, .alert-icon {
    font-size: 15px;
  }
  .search-bar {
    padding: 0 2vw;
  }
  .search-input {
    width: 98vw;
    font-size: 1em;
  }
}
@media (max-width: 600px) {
  .alert-list {
    width: 99vw;
    padding: 8px 0;
  }
  .alert-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 0.95em;
    padding: 8px 2vw;
  }
  .alert-text {
    font-size: 13.5px;
  }
  .alert-date, .alert-icon {
    font-size: 13px;
  }
  .search-bar {
    padding: 0 1vw;
  }
  .search-input {
    width: 95vw;
    font-size: 0.98em;
    padding: 8px 8px;
  }
}
</style>
