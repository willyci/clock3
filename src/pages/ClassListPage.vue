<template>
  <base-layout page-title="" page-default-back-link="login">
    <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">          
          <h3>Class Schedule</h3>
          <h1>{{ userName }}</h1>
          <h2 style="margin:0px;">Today</h2>
          <h1 style="margin:0px;">{{ currentDate }}</h1>
          <h1 style="margin:0px;">{{ currentTime}}</h1>
        </ion-col>
      </ion-row>
    </ion-grid>


<ion-grid>
  <ion-row
    v-for="cuClass in classes"
    :key="cuClass.id"
    class="course-block"
    @click="router.push(`/submitTime/${cuClass.classID}`)"
  >
  <ion-col size="8" style="text-align: left;">  
        <ion-text>
          <h3 style="margin:0px;" >{{ cuClass.ClassTitle }}</h3>
        </ion-text>
      </ion-col><ion-col size="4" style="text-align: right;"> 
        <ion-text style="text-align: right">
          <h3 style="margin:0px;" >{{ cuClass.classStartTime }}</h3>
        </ion-text></ion-col>
  </ion-row>
</ion-grid>  

    <!--
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
    -->
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
import { IonIcon } from "@ionic/vue";
import {
  chevronForward,
  lockClosedOutline,
  refreshOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    IonIcon,
  },
  data() {
    return {
      classes: [],
      currentDate: "",
      currentTime: "",
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

    getTime(){
      let time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      time =
        hours +
        ":" +
        minutes +
        " " +
        ampm;
      return time;
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
          this.$store.commit("addUserID",data.id);
          this.$store.commit("addClasses",data.classes);
        });

      //this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
      //this.$store.commit("addUserID", this.userID?this.userID:"123");
    },

    //gotoPage(p) {
      //if (p==1) {router.push('/login');}
    //},
  },
  mounted: function () {
    //update table display onload
    this.getClass();
    let today = new Date();
    this.currentDate = today.toDateString();
    this.currentTime = this.getTime();
    console.log("today is = " + this.currentDate);
  },
  computed:{
      loadUserID(){
          //return this.$store.getters.memories;
           //return this.$store.getters.cuClass('154');
           //return this.$store.state.userID;
           //console.log(this.$store.state.tesmpClasses);
           console.log(this.$store.state.classes);
            return this.$store.state.classes.legnth;
      }
  }
};
</script>

<style scoped>
h1 {
  font-weight: bold;
}
.course-block {
    display: flex;
    background-color: #3880ff;
    color: white;
    border-radius: 5px;
    padding: 0px 10px;
    margin-bottom: 10px;

} 
</style>