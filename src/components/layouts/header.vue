<template>
  <div
    class="nav-container"
    :class="{ 'is-active': isActive }"
    tabindex="0"
    ref="navRef"
    @blur="blurNav"
  >
    <div class="nav-toggle" @click="toggleNav"></div>
    <nav class="nav-items">
      <RouterLink class="nav-item" to="/products">المنتجات</RouterLink>
      <RouterLink class="nav-item" to="/addProducts">اضافة منتجات(جرد)</RouterLink>
      <RouterLink class="nav-item" to="/notifications">الاشعارات</RouterLink>
      <RouterLink class="nav-item" to="/profits">الارباح</RouterLink>
      <RouterLink class="nav-item" to="/statements">الاحصائيات</RouterLink>
      <RouterLink class="nav-item" to="/reports">التقارير</RouterLink>
      <RouterLink class="nav-item" to="/help">المساعدة</RouterLink>
      <RouterLink class="nav-item" to="/settings">الاعدادات</RouterLink>
    </nav>
  </div>

  <div class="animated-background">
  <div class="ball"></div>
  <div class="ball"></div>
  <div class="ball"></div>
  <div class="ball"></div>
  <div class="ball"></div>
  <div class="ball"></div>
  <div class="blur-overlay"></div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isActive = ref(false);
const navRef = ref(null);

function toggleNav() {
  isActive.value = !isActive.value;
}

function blurNav() {
	setTimeout(() => {
		isActive.value = false;
	}, 100);
}
</script>


<style scoped>
.nav-container {
	 position: relative;
	 display: inline-block;
	 max-width: 50px;
	 max-height: 50px;
	 overflow: visible;
	 outline: none;
}
 .nav-container.is-active .nav-toggle:before, .nav-container.is-active .nav-toggle:after {
	 box-shadow: none;
	 background: #555;
}
 .nav-container.is-active .nav-toggle:before {
	 transform: rotate(-45deg);
}
 .nav-container.is-active .nav-toggle:after {
	 transform: rotate(45deg);
}
 .nav-container.is-active .nav-items {
	 transform: translate(0, 0);
}
 .nav-container .nav-toggle {
	 position: fixed;
	 width: 40px;
	 height: 40px;
	 margin: 10px;
	 z-index: 2;
}
 .nav-container .nav-toggle:hover {
	 cursor: pointer;
}
 .nav-container .nav-toggle:before, .nav-container .nav-toggle:after {
	 content: "";
	 position: absolute;
	 top: 18px;
	 left: 0;
	 transform: translate(0, 0);
	 width: 100%;
	 height: 4px;
	 background: #b4b4b4;
	 transition: transform 0.3s ease, box-shadow 0.3s ease;
}
 .nav-container .nav-toggle:before {
	 box-shadow: 0 13.3333333333px 0 0 #b4b4b4;
}
 .nav-container .nav-toggle:after {
	 box-shadow: 0 -13.3333333333px 0 0 #b4b4b4;
}
 .nav-container .nav-items {
	 position: fixed;
	 top: 0;
	 left: 0;
	 /* min-width: 300px; */
	 max-width: 20vw;
	 width: 100vw;
	 height: 100vh;
	 z-index: 1;
	 padding: 80px 20px 20px 10px;
	 transition: transform 0.3s ease;
	 transform: translate(calc(-100% - 50px), 0);
	 background: #efefef;
	 display: grid;
	 grid-template-columns: 1fr;
	 grid-gap: 5px 0;
	 align-content: start;
	 box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}
 .nav-container .nav-items .nav-item {
	 background: #e2e2e2;
	 padding: 10px;
	 transition: background-color 0.3s ease;
     text-decoration: none;
     text-align: center;
	 border-radius: 8px;
}
 .nav-container .nav-items .nav-item:hover {
	 cursor: pointer;
	 background: #d6d6d6;
}
.active-link {
  background-color: #00c2ff !important;
  font-weight: bold;
}




.animated-background {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  overflow: hidden;
  z-index: -1; /* خلف كل شي */
}

/* كرات */
.ball {
  position: absolute;
  width: 100px; height: 100px;
  border-radius: 50%;
  opacity: 0.3;
  background: radial-gradient(circle, rgba(255,255,255,0.6), transparent);
  animation: floatBall 15s infinite ease-in-out;
}

/* كل كرة لها موقع أولي مختلف */
.ball:nth-child(1) { top: 10%; left: 20%; background-color: #FF6F61; }
.ball:nth-child(2) { top: 30%; left: 60%; background-color: #006D5B; }
.ball:nth-child(3) { top: 50%; left: 10%; background-color: #FF6F61; }
.ball:nth-child(4) { top: 80%; left: 70%; background-color: #006D5B; }
.ball:nth-child(5) { top: 40%; left: 40%; background-color: #FF6F61; }
.ball:nth-child(6) { top: 20%; left: 85%; background-color: #006D5B; }

/* حركة عشوائية */
@keyframes floatBall {
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -30px) scale(1.1); }
  50% { transform: translate(-60px, 40px) scale(0.9); }
  75% { transform: translate(30px, -50px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
}

/* طبقة Blur فوق الكرات */
.blur-overlay {
  position: absolute;
  width: 100%; height: 100%;
  backdrop-filter: blur(5px);
}

</style>