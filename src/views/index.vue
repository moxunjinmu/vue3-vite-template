<script setup lang="ts">
import axios from 'axios';

const name = ref('111');
axios.get('/api/getUsers').then((res) => {
  console.log(res);
});
</script>

<template>
  <div>index</div>
  <div>{{ name }}</div>
</template>

<style scoped>

</style>
