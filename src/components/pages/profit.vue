<template>
<Auth routePath="/profits">
  <div class="profit-box">
    <h2>📈 صفحة الأرباح</h2>
    <table class="profit-table">
      <tr>
        <td>{{ totalBuy.toLocaleString() }} دينار</td>
        <th>💸 إجمالي المصروف</th>
      </tr>
      <tr>
        <td>{{ totalSell.toLocaleString() }} دينار</td>
        <th>🛍️ إجمالي المبيعات</th>
      </tr>
      <tr :class="['profit-row', profit >= 0 ? 'gain' : 'loss']">
        <td>{{ profit.toLocaleString() }} دينار</td>
        <th>📊 الربح الصافي</th>
      </tr>
    </table>
  </div>

  <h3 style="color:#00c2ff; margin-top:40px;">📊 الربح اليومي في هذا الشهر</h3>
  <div class="chart-container">
    <canvas ref="dailyProfitChart"></canvas>
  </div>
</Auth>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);
const totalSell = ref(50000); // رقم مؤقت
const profitDates = ref([]);
const profitValues = ref([]);

const totalBuy = computed(() => {
  // اجمع كل الأسعار الشرائية للمنتجات (مثال: priceIn)
  return products.value.reduce((sum, p) => sum + (p.priceIn ? p.priceIn * (p.qty || 1) : 0), 0);
});

const profit = computed(() => totalSell.value - totalBuy.value);

onMounted(async () => {
  // جلب المنتجات من نفس API المنتجات
  try {
    const res = await axios.get('http://localhost:3000/products');
    products.value = res.data;
  } catch (e) {
    products.value = [];
  }
  // بيانات تجريبية للرسم البياني
  profitDates.value = [
    '2025-09-01', '2025-09-02', '2025-09-03', '2025-09-04', '2025-09-05',
    '2025-09-06', '2025-09-07', '2025-09-08', '2025-09-09', '2025-09-10'
  ];
  profitValues.value = [100, 200, 150, 300, 250, 400, 350, 500, 450, 600];

  // رسم الشارت
  if (window.Chart) {
    const ctx = dailyProfitChart.value.getContext('2d');
    new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: profitDates.value,
        datasets: [{
          label: '📈 الربح اليومي',
          data: profitValues.value,
          borderColor: '#4caf50',
          backgroundColor: '#4caf5077',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
});

const dailyProfitChart = ref(null);
</script>

<style scoped>
.profit-box {
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  /* background-color: #2b2b2b; */
    background-color: rgba(255, 255, 255, 0.083);

  border: 2px solid #444;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

.profit-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
}

.profit-table th, .profit-table td {
  border: 1px solid #555;
  padding: 14px;
  font-size: 16px;
  text-align: center;
}

.profit-table th {
  background-color: #3a3a3a;
  color: #f2f2f2;
}

.profit-table td {
  background-color: #2f2f2f;
  color: #ddd;
}

.profit-row.gain {
  background-color: #2e3b2e;
  border-left: 6px solid #4caf50;
}

.profit-row.loss {
  background-color: #3b2e2e;
  border-left: 6px solid #f44336;
}

.profit-box h2 {
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
}
.chart-container {
  width: 100%;
  min-height: 320px;
  height: 340px;
  margin: 0 auto;
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  border: 1.5px solid #444;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  padding: 18px 8px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Responsive styles */
@media (max-width: 900px) {
  .profit-box {
    width: 98vw;
    padding: 10px 2vw;
  }
  .profit-table th, .profit-table td {
    font-size: 14px;
    padding: 10px 4px;
  }
  .profit-box h2 {
    font-size: 1.1em;
  }
  .chart-container {
    min-height: 200px;
    height: 220px;
    padding: 8px 2vw;
  }
}
@media (max-width: 600px) {
  .profit-box {
    width: 99vw;
    padding: 4vw 1vw;
  }
  .profit-table th, .profit-table td {
    font-size: 12.5px;
    padding: 7px 2px;
  }
  .profit-box h2 {
    font-size: 1em;
  }
  .chart-container {
    min-height: 120px;
    height: 140px;
    padding: 4px 0;
  }
}
</style>
