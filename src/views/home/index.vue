<script setup lang="ts">
import { test } from '../../api/index.ts';

function testBTN() {
  test().then(() => {

  });
}
</script>

<template>
  <div>home</div>
  <img src="@/static/test.jpg" alt="">
  <button @click="testBTN">测测测</button>
</template>
