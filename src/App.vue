
<template>
  <Header/>
  <router-view />
  <Footer/>
</template>


<script setup>


import Header from './components/layouts/header.vue'
import Footer from './components/layouts/footer.vue'

</script>
<style>
@media (max-width: 1200px) {
  .docs-sidebar {
    width: 200px;
  }
  .alert-list,
  .profit-box,
  .form-box {
    width: 95%;
  }
}

@media (max-width: 992px) {
  /* Grid الرئيسي */
  .product-add,
  .form-box-div {
    grid-template-columns: 1fr;
    max-width: 90%;
    transform: none;
    margin: 0 auto;
  }

  /* مستندات التوثيق */
  .docs-container {
    flex-direction: column;
    gap: 20px;
  }
  .docs-sidebar,
  .docs-content {
    width: 100%;
  }

  /* شريط التنقل */
  .nav-links {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  /* الفوتر */
  .footer {
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

  /* الجداول */
  table {
    width: 100%;
    font-size: 14px;
  }
  input, select, textarea {
     max-width: 20vw;
  }
}

@media (max-width: 576px) {
  /* خطوط أصغر */
  body {
    font-size: 14px;
  }
  h1 { font-size: 22px; }
  h2 { font-size: 18px; }
  h3 { font-size: 16px; }

  /* الكروت */
  .product-card {
    width: 100%;
    margin: 10px 0;
  }

  /* حقول النموذج */
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }
  .form-row label,
  .form-row input,
  .form-row select {
    width: 100%;
    max-width: 300px;
  }

  /* شريط التنقل */
  .navbar {
    flex-direction: column;
    gap: 10px;
  }
  .nav-links {
    flex-direction: column;
    gap: 8px;
  }

  /* الرسم البياني */
  .chart-container {
    height: 250px;
    padding: 10px;
  }
}
@media (max-width: 576px) {
  .product-card {
    max-width: 50%;
  }

  input, select {
    max-width: 90%;
  }

  .form-row {
    flex-direction: column;
    align-items: center;
  }

  .form-box-div {
    grid-template-columns: 1fr;
    max-width: 90%;
  }
}
@media (max-width: 576px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
@media (max-width: 576px) {
  .product-add,
  .form-box-div {
    grid-template-columns: 1fr;
    max-width: 90%;
    margin: 0 auto;
  }

  input, select {
    width: 100%;
    max-width: none;
  }
}
@media (max-width: 576px) {
  .imgClick{
   transform: scale(2);
  }
  input, select, textarea {
    font-size: 17px;
    padding: 12px 14px;
    width: 100%;
    max-width: 90vw;
    box-sizing: border-box;
  }

  label {
    font-size: 16px;
    display: block;
    margin-bottom: 6px;
  }

  button {
    font-size: 16px;
    padding: 10px 16px;
  }

  .form-row {
    flex-direction: column;
    align-items: stretch;
  }

  h1, h2, h3 {
    font-size: 20px;
  }

  .product-card {
    font-size: 16px;
    padding: 16px;
  }
}
/* .form-box, .product-add, .form-box-div {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
} */


  .nav {
  background-color: #2c2c2c;
  padding: 10px 20px;
  display: none;
  justify-content: space-between;
  align-items: center;
}

.hamburger {
  font-size: 26px;
  background: none;
  border: none;
  color: #00c2ff;
  cursor: pointer;
  display: none;
}
.nav-menu {
  display: flex;
  gap: 20px;
  list-style: none;
}
.nav-menu li a {
  color: #ccc;
  text-decoration: none;
  font-weight: bold;
}
@media (max-width: 768px) {
  .navbar{
    display: none;
  }
  .nav{
    display: flex;
  }
  .hamburger {
    display: block;
  }
  .nav-menu {
    display: none;
    flex-direction: column;
    background-color: #2c2c2c;
    position: absolute;
    top: -50px;
    width: 80%;
    left: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    border: 1px solid #444;
    padding: 10px;
    border-radius: 8px;
    z-index: 999;
    animation: slideDown 0.5s ease;
  }
  .nav-menu.show {
    display: flex;
  }
}
@keyframes slideDown {
  from { opacity: 0; }
  to { opacity: 1; }
}

</style>
