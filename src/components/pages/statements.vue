<template>
  <Auth routePath="/statements" @authenticated="loadStats">
    <h2>إحصائيات المبيعات</h2>
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </Auth>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick } from 'vue';
import axios from 'axios';

const { appContext } = getCurrentInstance();
const API_BASE = appContext.config.globalProperties.$api;

const chartRef = ref(null);
let chartInstance = null;

async function loadStats() {
  try {
    const res = await axios.get(`${API_BASE}/stats-data`);
    const labels = res.data.labels || [];
    const values = res.data.values || [];


    await nextTick(); // ننتظر DOM يرندر الـ canvas

    if (!chartRef.value) {
      console.warn('⚠️ الـ canvas غير موجود وقت الرسم');
      return;
    }

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new window.Chart(chartRef.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'عدد المبيعات',
            data: values,
            backgroundColor: '#36A2EB',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  } catch (err) {
    console.error('خطأ في جلب بيانات الإحصائيات:', err);
  }
}
</script>



<style scoped>
h2{
    text-align: center;
    color: #f1f1f1;
}
/* Responsive styles */
@media (max-width: 900px) {
  h2 {
    font-size: 1.1em;
    margin-top: 10px;
  }
  canvas {
    width: 98vw !important;
    height: 180px !important;
    max-width: 98vw;
    display: block;
    margin: 0 auto;
  }
}
@media (max-width: 600px) {
  h2 {
    font-size: 1em;
    margin-top: 6px;
  }
  canvas {
    width: 99vw !important;
    height: 120px !important;
    max-width: 99vw;
    display: block;
    margin: 0 auto;
  }
}
.chart-container {
  height: 400px;
}
</style>
