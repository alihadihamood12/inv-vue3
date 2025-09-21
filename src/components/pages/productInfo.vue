<template>
  <div class="product-info-container" @click.self="emitClose">
    <div class="product-card-info">
      <button class="close-btn" @click="emitClose">×</button>
      <template v-if="product && Object.keys(product).length">
        <template v-if="!editMode">
          <h2>{{ product.name }}</h2>
          <p><b>القسم:</b> {{ product.category }}</p>
          <p><b>سعر الشراء:</b> {{ product.priceIn }}</p>
          <p><b>سعر البيع:</b> {{ product.priceOut }}</p>
          <p><b>الكمية:</b> {{ product.qty }}</p>
          <p><b>تاريخ الانتهاء:</b> {{ product.expiryDate }}</p>
          <p><b>الباركود:</b> {{ product.barcode }}</p>
          <p><b>رابط الصورة:</b> {{ product.imgPath }}</p>
          <button class="edit-btn" @click="startEdit">تعديل</button>
        </template>
        <template v-else>
          <h2><input v-model="editProduct.name" /></h2>
          <p><b>القسم:</b> <input v-model="editProduct.category" /></p>
          <p><b>سعر الشراء:</b> <input v-model.number="editProduct.priceIn" type="number" /></p>
          <p><b>سعر البيع:</b> <input v-model.number="editProduct.priceOut" type="number" /></p>
          <p><b>الكمية:</b> <input v-model.number="editProduct.qty" type="number" /></p>
          <p><b>تاريخ الانتهاء:</b> <input v-model="editProduct.expiryDate" type="date" /></p>
          <p><b>الباركود:</b> <input v-model="editProduct.barcode" /></p>
          <p><b>رابط الصورة:</b> <input v-model="editProduct.imgPath" /></p>
          <button class="save-btn" @click="saveEdit">حفظ</button>
          <button class="cancel-btn" @click="cancelEdit">إلغاء</button>
        </template>
      </template>
      <template v-else>
        <div style="color:#fff;">جاري تحميل بيانات المنتج...</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue';
import axios from 'axios';

const props = defineProps({ id: { type: [String, Number], required: true } });
const emit = defineEmits(['close']);

const { appContext } = getCurrentInstance();
const API_BASE = appContext.config.globalProperties.$api;

const product = reactive({});
const editProduct = reactive({});
const editMode = ref(false);

async function fetchProduct() {
  try {
    const res = await axios.get(`${API_BASE}/products/${props.id}`);
    if (res.data && res.data.product) {
      Object.assign(product, res.data.product);
    } else {
      alert('لم يتم العثور على المنتج');
    }
  } catch (e) {
    alert('لم يتم العثور على المنتج');
  }
}

function startEdit() {
  Object.assign(editProduct, product);
  editMode.value = true;
}

function cancelEdit() {
  editMode.value = false;
}

async function saveEdit() {
  try {
    await axios.put(`${API_BASE}/products/${props.id}`, editProduct);
    Object.assign(product, editProduct);
    editMode.value = false;
    alert('تم تحديث المنتج بنجاح');
  } catch (e) {
    alert('حدث خطأ أثناء التحديث');
  }
}

function emitClose() {
  emit('close');
}

watch(() => props.id, fetchProduct, { immediate: true });
</script>

<style scoped>
.product-info-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.product-card-info {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00c2ff;
  border-radius: 16px;
  padding: 32px 28px;
  min-width: 320px;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0,194,255,0.18);
  text-align: center;
  position: relative;
}
.product-card-info h2 {
  color: #00c2ff;
  margin-bottom: 18px;
}
.product-card-info p {
  color: #fff;
  margin: 10px 0;
  font-size: 1.1em;
}
.product-card-info input {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #bbb;
  background: #222;
  color: #fff;
  min-width: 120px;
  margin: 0 6px;
}
.edit-btn, .save-btn, .cancel-btn {
  margin-top: 18px;
  margin-left: 8px;
  background: #00c2ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.edit-btn:hover, .save-btn:hover {
  background: #0288d1;
}
.cancel-btn {
  background: #888;
}
.cancel-btn:hover {
  background: #444;
}
.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  color: #fff;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #00c2ff;
}
</style>
