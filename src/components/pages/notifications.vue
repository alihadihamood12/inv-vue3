<template>
  <div>
    <div class="search-bar">
      <label class="search-label">عدد الأيام التي تعتبر المنتج راكدًا:</label>
      <input type="number" v-model.number="limitDays" min="1" class="search-input" />
    </div>
    <div class="alert-list">
      <template v-if="hasAlerts">
        <template v-for="p in lowStock">
          <div v-if="p.qty === 0" class="alert-item" style="border-left-color:#999999;">
            <span class="alert-date"></span>
            <div class="alert-text">الكمية منتهية لمنتج: "{{ p.name }}"</div>
            <span class="alert-icon">❌</span>
          </div>
          <div v-else class="alert-item" style="border-left-color:#ffc107;">
            <span class="alert-date">المتبقي {{ p.qty }}</span>
            <div class="alert-text">الكمية منخفضة لمنتج "{{ p.name }}"</div>
            <span class="alert-icon">⚠️</span>
          </div>
        </template>
        <template v-for="p in expired">
          <div class="alert-item" style="border-left-color:#f44336;">
            <span class="alert-date">{{ p.expiryDate }}</span>
            <div class="alert-text">صلاحية "{{ p.name }}" منتهية منذ مدة</div>
            <span class="alert-icon">⏳</span>
          </div>
        </template>
        <template v-for="p in products">
          <div v-if="!p.lastSold" class="alert-item" style="border-left-color:#886CE4;">
            <span class="alert-date">📦 جديد في المخزون</span>
            <div class="alert-text">منتج {{ p.name }} لم يتم بيعه بعد</div>
            <span class="alert-icon">🆕</span>
          </div>
          <div v-else-if="daysSinceLastSold(p) >= limitDays" class="alert-item" style="border-left-color:#03a9f4;">
            <span class="alert-date">منذ {{ daysSinceLastSold(p) }} يوم</span>
            <div class="alert-text">
              منتج {{ p.name }} لم يُبع منذ {{ daysSinceLastSold(p) >= 30 ? 'شهر تقريبًا' : daysSinceLastSold(p) + ' يوم' }}
            </div>
            <span class="alert-icon">🕒</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="alert-item">
          <span class="alert-icon">✅</span>
          <div class="alert-text">لا توجد تنبيهات حالياً، كلشي تمام 🙌</div>
          <span class="alert-date">الآن</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// بيانات تجريبية (استبدلها ببياناتك أو API)
const products = ref([
  { id: 1, name: 'منتج 1', qty: 0, expiryDate: '', lastSold: '2025-08-01' },
  { id: 2, name: 'منتج 2', qty: 2, expiryDate: '', lastSold: '2025-09-01' },
  { id: 3, name: 'منتج 3', qty: 10, expiryDate: '2024-07-01', lastSold: null },
  { id: 4, name: 'منتج 4', qty: 5, expiryDate: '', lastSold: '2024-09-10' },
]);
const lowStock = computed(() => products.value.filter(p => p.qty <= 5));
const expired = computed(() => products.value.filter(p => p.expiryDate && new Date(p.expiryDate) < new Date()));
const limitDays = ref(14);

const hasAlerts = computed(() =>
  lowStock.value.length > 0 || expired.value.length > 0 ||
  products.value.some(p => !p.lastSold || daysSinceLastSold(p) >= limitDays.value)
);

function daysSinceLastSold(p) {
  if (!p.lastSold) return null;
  const now = new Date();
  const lastDate = new Date(p.lastSold);
  return Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
}
</script>

<style scoped>
.alert {
  background-color: #444;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.alert-list {
  width: 50%;
  margin: 20px auto;
  /* background-color: #2f2f2f; */
    background-color: rgba(255, 255, 255, 0.091);

  border: 2px solid #444;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
}

.alert-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a3a3a;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  border-left: 6px solid #00c2ff;
  transition: background-color 0.3s;
}

.alert-item:hover {
  background-color: #444;
}

.alert-icon {
  font-size: 22px;
  margin-right: 10px;
}

.alert-text {
  flex-grow: 1;
  text-align: right;
  font-size: 16px;
  color: #eee;
}

.alert-date {
  font-size: 13px;
  color: #aaa;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 24px;
}
.search-label {
  color: #eee;
  margin-bottom: 8px;
  font-size: 1.1em;
  align-self: center;
  text-align: center;
  width: 100%;
}
.search-input {
  width: 220px;
  padding: 10px 16px;
  border-radius: 16px;
  border: 1.5px solid #b3b3b3;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 1.1em;
  outline: none;
  transition: box-shadow 0.2s, border 0.2s;
  margin-bottom: 0;
  text-align: center;
}
.search-input:focus {
  border: 1.5px solid #03a9f4;
  box-shadow: 0 4px 16px rgba(3,169,244,0.10);
}
/* Responsive styles */
@media (max-width: 900px) {
  .alert-list {
    width: 91vw;
    padding: 10px 2vw;
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
