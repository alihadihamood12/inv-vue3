<template>
    <Auth routePath="/statements">
        <h2>إحصائيات المبيعات</h2>
        <canvas ref="chartRef" width="400" height="150"></canvas>
    </Auth>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref(null);

onMounted(async () => {
  // بيانات وهمية للتجربة
  const data = {
    labels: ['بيتنجان', 'بتيتة', 'قلادة', 'تيشيرت', 'اسوار', 'ساعة'],
    values: [12, 19, 7, 15, 10, 22]
  };
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'عدد المبيعات',
            data: data.values,
            backgroundColor: '#36A2EB',
          },
        ],
      },
    });
  }
});
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
</style>
