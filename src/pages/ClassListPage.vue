<template>
  <base-layout page-title="Class Schedule" page-default-back-link="login">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <h1>Today for {{ userName }}</h1>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <h2>{{ currentDate }}</h2>
        </ion-col>
      </ion-row>
    </ion-grid>
    <h1>student's class list</h1>
    <ion-list>
      <ion-item
        v-for="cuClass in classes"
        :key="cuClass.id"
        :router-link="`/submitTime/${cuClass.classID}`"
      >
        {{ cuClass.ClassTitle }} - start at {{ cuClass.classStartTime }}

        <ion-icon :icon="chevronForward" size="small" slot="end"></ion-icon
      ></ion-item>
    </ion-list>
    <h1>Faculty's class list</h1>
    <ion-list>
      <ion-item
        v-for="cuClass in classes"
        :key="cuClass.id"
        :router-link="`/studentList/${cuClass.classID}`"
      >
        {{ cuClass.ClassTitle }} - start at {{ cuClass.classStartTime }}

        <ion-icon :icon="chevronForward" size="small" slot="end"></ion-icon
      ></ion-item>
    </ion-list>
<ion-grid>
    <ion-row>
      <ion-col size="6">
          <ion-button  expand="block" @click="this.getClass();">
      <ion-icon slot="start" :icon="refreshOutline"></ion-icon>
      Refresh
    </ion-button>
      </ion-col>
      <ion-col size="6">
          <ion-button expand="block" @click="() => router.push('/login')">
      <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
      Logout
    </ion-button>
      </ion-col></ion-row>
</ion-grid>          

    
  </base-layout>
</template>
<script>
import { IonList, IonItem, IonIcon } from "@ionic/vue";
import {
  chevronForward,
  lockClosedOutline,
  refreshOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    IonList,
    IonItem,
    IonIcon,
  },
  data() {
    return {
      classes: [],
      currentDate: "",
      chevronForward,
      lockClosedOutline,
      refreshOutline,
      msg: "hi",
      userName: "",
      userRole: "",
      userID: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    getTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      var hours = today.getHours();
      var minutes = today.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      today =
        mm +
        "/" +
        dd +
        "/" +
        yyyy +
        " -- " +
        hours +
        ":" +
        minutes +
        " " +
        ampm;
      return today;
    },

    getClass() {
      this.classes =[];  
      this.userRole ='';
      this.userName = '';
      this.userID = '';

      fetch("https://flexcode.org/classes.json")
        .then((response) => response.json())
        .then((data) => {
          this.classes = data.classes;
          this.userRole = data.role;
          this.userName = data.name;
          this.userID = data.id;
        });

      //this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
      this.$store.dispatch("addUserName", this.userName);
    },

    //gotoPage(p) {
      //if (p==1) {router.push('/login');}
    //},
  },
  mounted: function () {
    //update table display onload
    this.getClass();
    this.currentDate = this.getTodayDate();
    console.log("today is = " + this.currentDate);
  },
};
</script>
