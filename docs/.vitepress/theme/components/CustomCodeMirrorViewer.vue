<template>
  <pre>
    <code ref="codeBlock" class="hljs"></code>
  </pre>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 你可以选择其他样式

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
});

const codeBlock = ref(null);

const highlightCode = () => {
  if (codeBlock.value) {
    codeBlock.value.textContent = props.code;
    hljs.highlightBlock(codeBlock.value);
  }
};

onMounted(highlightCode);
watch(() => props.code, highlightCode);
</script>

<style scoped>
/* Optional: add some custom styling */
</style>
