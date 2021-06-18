<template>
    <h1>Clock Attendance</h1>
    <ion-item>
    <ion-input  placeholder="User Name / email"></ion-input>
  </ion-item>
  <ion-item>
    <ion-input placeholder="Password" type="password"></ion-input>
  </ion-item>
    <ion-button  expand="full" size="default" @click="() => router.push('/classList')">Login</ion-button>
</template>
<script>
import { IonInput, IonItem } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default {
    name:'login',
    components: {  IonInput, IonItem },
    setup() {
      const router = useRouter();
      return { router };
    },
    data(){
        return {};
    },
    methods:{},
    mounted:function(){

    }
};
</script>