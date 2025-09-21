<template>
    <Auth routePath="/reports">
    <div id="app" class="container">
        <h1>عرض التقارير</h1>
        
        <div class="pdf-controls" v-if="pdfUrl">
            <button @click="setReport('week')" :class="{active: reportType==='week'}">التقرير الاسبوعي</button>
            <button @click="setReport('month')" :class="{active: reportType==='month'}">التقرير الشهري</button>
            <button @click="openInNewTab">فتح في نافذة جديدة</button>
        </div>
        
        <div class="pdf-container" v-if="pdfUrl">
            <iframe 
                :src="pdfUrl" 
                class="pdf-viewer" 
                frameborder="0"
                @load="pdfLoaded"
                @error="pdfError"
            ></iframe>
        </div>
        
        <div v-else-if="loading" class="loading">
            <p>جاري تحميل الملف...</p>
        </div>
        
        <div v-else class="upload-section">
            <p>اختر ملف PDF لعرضه:</p>
            <input 
                type="file" 
                accept=".pdf" 
                @change="handleFileUpload"
                ref="fileInput"
            >
            <br>
            <button class="upload-btn" @click="triggerFileInput">📁 اختيار ملف</button>
            
            <p>أو استخدم رابط ملف PDF:</p>
            <input 
                type="text" 
                v-model="pdfUrlInput" 
                placeholder="أدخل رابط PDF هنا"
                style="padding: 8px; width: 300px; margin-right: 10px;"
            >
            <button @click="loadPdfFromUrl">تحميل</button>
        </div>
        
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>

    

</Auth>
</template>


<script setup>
        import { ref } from 'vue';
                const pdfUrl = ref('');
                const pdfUrlInput = ref('');
                const loading = ref(false);
                const error = ref('');
                const fileInput = ref(null);
                const reportType = ref('week');
                
                const reportLinks = {
                    week: 'http://localhost:4000/reports/week',
                    month: 'http://localhost:4000/reports/month',
                };
                
                function setReport(type) {
                    reportType.value = type;
                    pdfUrl.value = reportLinks[type];
                }
                
                // تحميل PDF من رابط
                const loadPdfFromUrl = () => {
                    if (!pdfUrlInput.value) {
                        error.value = 'يرجى إدخال رابط صحيح';
                        return;
                    }
                    
                    loading.value = true;
                    error.value = '';
                    
                    // التحقق من أن الرابط ينتهي بـ .pdf
                    if (!pdfUrlInput.value.toLowerCase().endsWith('.pdf')) {
                        error.value = 'الرابط يجب أن يشير إلى ملف PDF';
                        loading.value = false;
                        return;
                    }
                    
                    pdfUrl.value = pdfUrlInput.value;
                };
                
                // التعامل مع رفع الملف
                const handleFileUpload = (event) => {
                    const file = event.target.files[0];
                    if (!file) return;
                    
                    if (file.type !== 'application/pdf') {
                        error.value = 'يرجى اختيار ملف PDF فقط';
                        return;
                    }
                    
                    loading.value = true;
                    error.value = '';
                    
                    // إنشاء URL للعرض
                    pdfUrl.value = URL.createObjectURL(file);
                };
                
                // تشغيل اختيار الملف
                const triggerFileInput = () => {
                    fileInput.value?.click();
                };
                           
                
                // فتح في نافذة جديدة
                const openInNewTab = () => {
                    window.open(pdfUrl.value, '_blank');
                };
                
                // عند تحميل PDF بنجاح
                const pdfLoaded = () => {
                    loading.value = false;
                    error.value = '';
                };
                
                // عند حدوث خطأ في تحميل PDF
                const pdfError = () => {
                    loading.value = false;
                    error.value = 'حدث خطأ في تحميل ملف PDF. يرجى التحقق من الرابط أو الملف.';
                };
                
                // تحميل تقرير افتراضي عند البدء
                setReport('week');
                
                // return {
                //     pdfUrl,
                //     pdfUrlInput,
                //     loading,
                //     error,
                //     fileInput,
                //     loadPdfFromUrl,
                //     handleFileUpload,
                //     triggerFileInput,
                //     downloadPdf,
                //     printPdf,
                //     openInNewTab,
                //     pdfLoaded,
                //     pdfError
                // };

    </script>


<style scoped>

        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            margin-top: 30px;
            background-color: rgba(45, 44, 44, 0.141);
            border: 2px solid #444;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
            overflow: hidden;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            color: #f1f1f1;
            margin-bottom: 20px;
        }
        
        .pdf-controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .pdf-controls button {
            padding: 10px 15px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .pdf-controls button:hover {
            background: #2980b9;
        }
        
        .pdf-controls button.active {
            background: #00c2ff;
            color: #fff;
            font-weight: bold;
        }
        .pdf-controls button:nth-child(3) {
            background: #2ecc71;

        }
        .pdf-container {
            width: 100%;
            height: 70vh;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .pdf-viewer {
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .upload-section {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;
        }
        
        .upload-btn {
            padding: 10px 20px;
            background: #2ecc71;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .upload-btn:hover {
            background: #27ae60;
        }
        
        .error-message {
            color: #e74c3c;
            text-align: center;
            margin-top: 10px;
        }
        
        .loading {
            text-align: center;
            padding: 20px;
            color: #7f8c8d;
        }
    /* Responsive styles */
    @media (max-width: 900px) {
        .container {
            max-width: 99vw;
            padding: 10px 2vw;
        }
        .pdf-controls {
            flex-direction: column;
            gap: 8px;
            font-size: 0.98em;
        }
        .pdf-container {
            height: 45vh;
            min-height: 180px;
        }
        .upload-section {
            padding: 8px 2vw;
            font-size: 0.98em;
        }
        h1 {
            font-size: 1.1em;
        }
    }
    @media (max-width: 600px) {
        .container {
            max-width: 100vw;
            padding: 4vw 1vw;
        }
        .pdf-controls {
            flex-direction: column;
            gap: 6px;
            font-size: 0.95em;
        }
        .pdf-container {
            height: 30vh;
            min-height: 100px;
        }
        .upload-section {
            padding: 4px 0;
            font-size: 0.95em;
        }
        h1 {
            font-size: 1em;
        }
    }
    </style>