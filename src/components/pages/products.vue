<template>
  <div>
    <h1>المنتجات المتوفرة</h1>
    <small style="display: inline-block; margin: 10px; color: #ccc;">
      <span style="display: inline-block; width: 12px; height: 12px; background-color: #4caf50; border-radius: 50%; margin-right: 6px;"></span>
      المنتج متوفر بشكل جيد
    </small>
    <br>
    <small style="display: inline-block; margin: 10px; color: #ccc;">
      <span style="display: inline-block; width: 12px; height: 12px; background-color: #ffc107; border-radius: 50%; margin-right: 6px;"></span>
      المنتج على وشك النفاد
    </small>
    <form @submit.prevent style="margin: 15px 0;">
      <input type="text" v-model="search" placeholder="🔍 ابحث عن منتج..." style="padding: 8px; width: 250px;">
    </form>
    <div v-if="barcodeEnabled" class="barcode-options" style="margin-bottom: 16px;">
      
      <template v-if="barcodeMode === 'camera'">
        <button type="button" @click="startScanner2">📷 امسح الباركود</button>
        <button type="button" v-show="scannerActive" @click="closeScanner2">اغلاق الكاميرا</button>
        <div v-show="scannerActive" style="width:300px;" id="scanner"></div>
      </template>
      <template v-else>
        <input v-model="search" type="text" placeholder="اكتب أو امسح الباركود من القارئ" style="padding: 8px; width: 250px; margin-top: 8px;">
      </template>
    </div>
    <select v-model="selectedCategory">
      <option value="">كل الأقسام</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
    <div class="productList">
      <div v-for="p in filteredProducts" :key="p.id" :class="['product-card', p.qty === 0 ? 'out' : p.qty < 5 ? 'low' : 'ok']">
        <h3>{{ p.name }}</h3>
        <p>القسم: <strong>{{ p.category }}</strong></p>
        <p>السعر: {{ p.priceOut }}</p>
        <p>الكمية: {{ p.qty }}</p>
        <div class="card-actions">
          <button type="button"
                  :disabled="p.qty === 0 || getCartQty(p.id) >= p.qty"
                  @click="addToCart(p)">➕ إضافة إلى السلة</button>
          <button type="button" @click="goToDetails(p.id)">تفاصيل المنتج</button>
          <button type="button" @click="returnProduct(p.id)">↩️ إرجاع المنتج</button>
        </div>
      </div>
    </div>
    <div
      v-show="cartToast"
      id="cartToast"
      class="cart-toast"
      @mouseenter="cartHover = true"
      @mouseleave="cartHover = false"
    >
      <div id="cartSummary">
        🛒 السعر الإجمالي: <span id="cartTotal">{{ cartTotal }}</span> دينار
      </div>
      <button id="checkoutBtn" style="margin-top:10px;" @click="checkout">✅ تم البيع</button>
      <button class="clear-cart-btn" @click="clearCart">🗑️ حذف السلة بالكامل</button>
      <div id="cartDropdown" class="cart-dropdown">
        <div v-for="item in cart" :key="item.id" class="cart-item-row">
          <span class="cart-item-info">{{ item.name }} × {{ item.qty }} = {{ item.priceOut * item.qty }}</span>
          <span class="cart-btns-wrapper">
            <transition-group name="cart-btns" tag="span" class="cart-btns" v-if="cartHover">
              <button :key="'plus-'+item.id" class="cart-action-btn plus" @click="incCart(item)">+</button>
              <button :key="'minus-'+item.id" class="cart-action-btn minus" @click="decCart(item)" :disabled="item.qty === 1">-</button>
              <button :key="'remove-'+item.id" class="cart-action-btn remove" @click="removeFromCart(item)">✖</button>
            </transition-group>

          </span>
        </div>
      </div>
    </div>
    <ProductInfo
      v-if="showProductInfo"
      :key="selectedProductId"
      :id="selectedProductId"
      @close="closeProductInfo"
    />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted, nextTick, getCurrentInstance } from 'vue';
import ProductInfo from './productInfo.vue';

const { appContext } = getCurrentInstance();
const API_BASE = appContext.config.globalProperties.$api;

const barcodeEnabled = ref(JSON.parse(localStorage.getItem('barcodeEnabled') || 'false'));
const barcodeMode = ref(localStorage.getItem('barcodeMode') || 'camera');

const products = ref([]);
const categories = computed(() => [...new Set(products.value.map(p => p.category))]);
const search = ref('');
const selectedCategory = ref('');
const showOutOnly = ref(false);
const scannerActive = ref(false);
const cart = ref([]);
const cartToast = ref(false);
const cartHover = ref(false);
const showProductInfo = ref(false);
const selectedProductId = ref(null);

onMounted(() => {
  axios.get(`${API_BASE}/products`)
    .then(res => {
      products.value = res.data.products || [];
    })
    .catch(err => console.error('Error fetching products:', err));
});

const filteredProducts = computed(() => {
  let list = products.value.slice();
  if (selectedCategory.value) {
    list = list.filter(p => p.category === selectedCategory.value);
  }
  if (search.value) {
    list = list.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()));
  }
  list.sort((a, b) => a.qty - b.qty);
  return showOutOnly.value ? list.filter(p => p.qty === 0) : list;
});

function addToCart(product) {
  const found = cart.value.find(item => item.id === product.id);
  if (found) found.qty++;
  else cart.value.push({ ...product, qty: 1 });
  cartToast.value = true;
}

function goToDetails(id) {
  selectedProductId.value = id;
  showProductInfo.value = true;
}

function closeProductInfo() {
  showProductInfo.value = false;
  selectedProductId.value = null;
}

function returnProduct(id) {
  axios.post(`${API_BASE}/return-product`, { productId: id })
    .then(() => {
      const updated = products.value.find(p => p.id === id);
      if (updated) updated.qty++;
    })
    .catch(() => alert('حدث خطأ أثناء إرجاع المنتج'));
}

const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.priceOut * item.qty, 0));

async function checkout() {
  if (cart.value.length === 0) {
    alert('السلة فارغة');
    return;
  }

  try {
    const res = await axios.post(`${API_BASE}/cart/checkout`, {
      items: cart.value.map(item => ({ id: item.id, qty: item.qty }))
    });

    if (res.data.success) {
      alert('✅ تم البيع بنجاح!');
      // تحديث الكميات في واجهة المنتجات
      res.data.sale.items.forEach(soldItem => {
        const prod = products.value.find(p => p.id === soldItem.productId);
        if (prod) prod.qty -= soldItem.qty;
      });
      // تفريغ السلة
      cart.value = [];
      cartToast.value = false;
    } else {
      alert('❌ فشل البيع: ' + (res.data.message || 'خطأ غير معروف'));
    }
  } catch (err) {
    console.error('خطأ في البيع:', err);
    alert('حدث خطأ أثناء البيع');
  }
}

function getCartQty(productId) {
  const found = cart.value.find(item => item.id === productId);
  return found ? found.qty : 0;
}

function incCart(item) {
  if (item.qty < getProductQty(item.id)) item.qty++;
}
function decCart(item) {
  if (item.qty > 1) item.qty--;
}
function removeFromCart(item) {
  const idx = cart.value.findIndex(i => i.id === item.id);
  if (idx !== -1) cart.value.splice(idx, 1);
}
function clearCart() {
  cart.value = [];
}
function getProductQty(id) {
  const p = products.value.find(p => p.id === id);
  return p ? p.qty : 0;
}
</script>

<style scoped>
*{
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}
/* .product-card.ok { background: #e8f5e9; }
.product-card.low { background: #fffde7; }
.product-card.out { background: #ffebee; } */
h1{
    margin-top: 20px;
    margin-bottom: 10px;
    color: #eee;
}
.card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  /* background-color: #2e2e2e; */
  background-color: rgba(255, 255, 255, 0.141);
  border: 2px solid #444;
  color: #eee;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.4);
  transition: background-color 0.3s, transform 0.3s;
}
.product-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}
.product-card img {
  width: 150px; 
  height: 150px; 
  object-fit: cover;
}
.imgClick{
  transform: scale(3);
}
.product-card.ok {
  border-color: #4caf50;
}
.product-card.low {
  border-color: #ffc107;
}
.product-card.out {
  border-color: #f44336;
}
button {
  padding: 8px 14px;
  margin: 5px 0;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  
}


.sell-btn {
  background-color: #28a745;
  color: white;
}
.sell-btn:hover {
  background-color: #218838;
}
.productList{
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
}
.cart-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid #b3b3b3;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  backdrop-filter: blur(8px);
  padding: 18px 24px 18px 18px;
  z-index: 999;
  min-width: 320px;
  max-width: 400px;
  transition: box-shadow 0.3s;
  text-align: right;
  overflow: hidden;
}
.cart-toast:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.28);
}
.cart-dropdown {
  margin-top:10px;
  background:rgba(255,255,255,0.10);
  border-top:1px solid #ccc;
  border-radius: 12px;
  padding:10px;
  text-align:right;
}
.cart-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 8px;
  flex-direction: row;
}
.cart-item-info {
  flex: 1;
  text-align: right;
}
.cart-btns-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  min-width: 100px;
}
.cart-btns {
  display: flex;
  flex-direction: row-reverse;
  gap: 6px;
  opacity: 1;
  transition: opacity 0.3s;
  margin-right: 0;
}
.cart-action-btn {
  position: static;
  margin-bottom: 0;
  border: 1px solid #bbb;
  border-radius: 8px;
  background: rgba(255,255,255,0.25);
  color: #222;
  font-size: 1.1em;
  font-weight: bold;
  padding: 2px 10px;
  margin-left: 2px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.cart-action-btn.plus{ margin-right: 0; }
.cart-action-btn.minus{ margin-right: 0; }
.cart-action-btn.remove{ margin-right: 0; }
.cart-action-btn.plus:hover { background: #e0ffe0; color: #0a0; }
.cart-action-btn.minus:hover { background: #fffbe0; color: #b59a00; }
.cart-action-btn.remove:hover { background: #ffe0e0; color: #c00; }
#checkoutBtn {
  margin-top: 8px;
  background: #e0ffe0;
  color: #0a0;
  border: 1px solid #0a0;
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
#checkoutBtn:hover {
  background: #0a0;
  color: #fff;
}
.clear-cart-btn {
  margin-top: 8px;
  background: #fff0f0;
  color: #c00;
  border: 1px solid #c00;
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.clear-cart-btn:hover {
  background: #c00;
  color: #fff;
}
.cart-btns-enter-active, .cart-btns-leave-active {
  transition: all 0.3s cubic-bezier(.55,0,.1,1);
}
.cart-btns-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.cart-btns-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.cart-btns-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.cart-btns-leave-to {
  opacity: 0;
  transform: translateX(40px);
}


      /* Responsive styles for mobile and tablet */
      @media (max-width: 900px) {
        .productList {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 10px;
          padding: 0 4vw;
        }
        .product-card {
          min-width: 120px;
          max-width: 98vw;
          font-size: 0.98em;
          padding: 10px 6px;
        }
        .cart-toast, .cart-dropdown {
          width: 95vw !important;
          left: 2vw !important;
          right: 2vw !important;
          font-size: 1em;
        }
        .cart-item-row {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        .cart-btns-wrapper {
          flex-direction: column;
          gap: 4px;
        }
        .product-card img {
          max-width: 90px;
          max-height: 90px;
        }
        h1 {
          font-size: 1.2em;
        }
      }

      @media (max-width: 600px) {
        .productList {
          grid-template-columns: 1fr !important;
          gap: 8px;
          padding: 0 2vw;
        }
        .product-card {
          min-width: 70vw;
          font-size: 0.95em;
          padding: 8px 2vw;
        }
        .cart-toast, .cart-dropdown {
          width: 99vw !important;
          left: 0 !important;
          right: 0 !important;
          font-size: 0.98em;
        }
        .cart-item-row {
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .cart-btns-wrapper {
          flex-direction: column;
          gap: 2px;
        }
        .product-card img {
          max-width: 70vw;
          max-height: 120px;
        }
        h1 {
          font-size: 1em;
        }
        .search-bar, .filters, .cart-btns {
          flex-direction: column !important;
          gap: 8px !important;
          align-items: stretch !important;
        }
        input, select, button {
          font-size: 1em !important;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }
      }
</style>