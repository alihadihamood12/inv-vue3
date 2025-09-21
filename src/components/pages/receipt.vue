<template>
    <div>
        <h1>Receipt {{ id }}</h1>
        <img :src="`${BACKEND_BASE}/receipt/${id}`" alt="123"></img>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
const { appContext } = getCurrentInstance();
const BACKEND_BASE = appContext.config.globalProperties.$backend;
import { useRoute } from "vue-router";
const id = ref();
onMounted(() => {
    const req = useRoute();
    id.value = req.params.id
});

</script>


<style scoped>
h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;    
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    letter-spacing: 1px;
    word-spacing: 2px;
}
img {
    display: block;
    margin: 0 auto;
    max-width: 80%;
    height: auto;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>