<script setup lang="ts" name='login'>
import { ref } from 'vue';
import { loginModal } from '@/hooks/loginModal';

const { name, password, login } = loginModal();

</script>
<template>
  <div class="sign">
    <div class="sign2">
      <div class="lay4">
        <img src="/src/assets/images/logo.png" />
      </div>
      <div class="lay5">
        <div class="lay lay1">
          <h2><img src="/src/assets/images/sign1.png" /></h2>
          <input
            v-model="name"
            type="text"
            name="userName"
            lay-verify="userName"
            autocomplete="off"
            placeholder="用户名"
            class="layui-input"
          >
        </div>
        <div class="lay lay1">
          <h2><img src="/src/assets/images/sign2.png" /></h2>
          <input
            v-model="password"
            type="password"
            name="password"
            lay-verify="password"
            autocomplete="off"
            placeholder="密码"
            class="layui-input"
          >
        </div>
      </div>
      <div class="lay3">
        <button @click="login">登录</button>
      </div>
      <div class="lay6">
        <h2>Go to the home page</h2>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/*登录*/
.sign{position:fixed;height:100%;width:100%;left:0px;top:0px;background:url("/src/assets/images/sign.jpg") no-repeat top center;background-size:100%;}
.sign1{text-align:center;margin:4% 0;}
.sign1 img{}
.sign2{width:450px;margin:0 auto;background:#114F85;margin-top:7%;}
.lay{border:1px solid #e6e6e6;border-radius:5px;}
.lay input::-webkit-input-placeholder{color:#999;font-size:14px;}
.lay input::-moz-placeholder{color:#999;font-size:14px;}
.lay input:-moz-placeholder{color:#999;font-size:14px;}
.lay1{background:#FFF;overflow:hidden;width:100%;margin:0 auto 28px;height:45px;overflow:hidden;}
.lay1 h2{width:17%;float:left;background:#FFF;text-align:center;margin:6px 0;border-right:1px solid #999;}
.lay1 input{width:82%;float:left;border:0px;background:#FFF;height:45px;font-size:16px;color:#656565;padding:0 15px;}
.lay2{background:#FFf;overflow:hidden;width:100%;margin:0 auto 28px;height:45px;overflow:hidden;}
.lay2 input{width:68%;float:left;border:0px;background:#FFF;height:45px;font-size:16px;color:#C5C5C5;border-right:1px solid #e6e6e6;}
.lay2 h2{width:32%;float:left;}
.lay2 img{width:100%;}
.lay3{background:url("/src/assets/images/sign3.png") no-repeat top center;width:480px;margin-left:-15px;padding-bottom:10px;}
.lay3 button{height:60px;width:100%;border:0px;font-size:20px;color:#FFF;background:none;}
.lay3 button:hover{color:#FFF;}
.lay4{text-align:center;background:#FFF;padding:30px 0;}
.lay4 h2{font-size:24px;color:#656565;margin-bottom:10px;}
.lay4 span{overflow:hidden;display:block;width:100px;margin:0 auto;height:1px;background:#176175;}

.lay5{padding:65px 45px;}
.lay6{text-align:center;padding:20px 0;}
.lay6 h2{font-size:16px;color:#519FE1;}
/*登录*/
</style>
