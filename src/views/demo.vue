<script setup lang="ts">
import { ref } from 'vue';
import { test } from '@/utils/test.json';

const a = ref(test);
console.log('a', a);

</script>
<template>
  <div class="demo">
    demo
  </div>
</template>
<style lang="scss">
.demo{
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-color: antiquewhite;
}
</style>
