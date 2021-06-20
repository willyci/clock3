<template>
  <ion-grid>
    <ion-row>
      <ion-col size="11">
        <h1>
          <ion-icon slot="start" :icon="timeOutline"></ion-icon> Clock
          Attendance <ion-icon slot="end" :icon="alarmOutline"></ion-icon>
        </h1>
        <ion-item>
          <ion-img
            src="../../assets/campus.cafe.logo.png"
            style="padding: 40px 10px"
          ></ion-img>
        </ion-item>
        <ion-item>
          <ion-input placeholder="User Name / email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input placeholder="Password" type="password"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
  <ion-row
    ><ion-col size="12">
      <ion-button expand="block" @click="() => router.push('/classList')">
        <ion-icon slot="start" :icon="lockOpenOutline"></ion-icon>
        Login
      </ion-button>
    </ion-col></ion-row
  >
</template>
<script>
import { IonInput, IonItem } from "@ionic/vue";
import { lockOpenOutline, timeOutline, alarmOutline } from "ionicons/icons";

import { useRouter } from "vue-router";
import { IonImg } from "@ionic/vue";

export default {
  name: "login",
  components: { IonInput, IonItem, IonImg },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      lockOpenOutline,
      timeOutline,
      alarmOutline,
      img: "../../assets/campus.cafe.logo.png",
    };
  },
  methods: {},
  mounted: function () {},
};
</script>