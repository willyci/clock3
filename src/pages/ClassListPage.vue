<template>
  <base-layout page-title="Class Schedule" page-default-back-link="login">



    <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">          
          <!--<h4>Class Schedule</h4>-->
          <h2 style="font-weight:bold;">{{ userName }}</h2>
          <h2 style="margin:0px;">Today</h2>
          <h2 style="margin:0px;font-weight:bold;">{{ currentDate }}</h2>
          <h2 style="margin:0px;font-weight:bold;padding-bottom:40px;">{{ currentTime}}</h2>
          
        </ion-col>
      </ion-row>
    </ion-grid>

<!-------------------------------------->
<!--
<ion-grid v-if="isStudent == true">
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
-->
<!-------------------------------------->
<ion-grid v-if="isStudent == true">
  <ion-row
    v-for="cuClass in classes"
    :key="cuClass.id"
    class="course-block"
    @click="router.push(`/submitTime/${cuClass.classID}`)"
  >
        <ion-text style="margin: 5px 0px;">          
          <span>{{ cuClass.classStartTime }}</span><br/>
          <span>{{ cuClass.ClassTitle }} </span>  
          <span> ( {{ cuClass.classID }} )</span>
        </ion-text>
      
  </ion-row>
</ion-grid> 
<!-------------------------------------->

<ion-grid v-if="isStudent != true">
  <ion-row
    v-for="cuClass in classes"
    :key="cuClass.id"
    class="course-block"
    @click="router.push(`/studentList/${cuClass.classID}`)"
  >
        <ion-text style="margin: 5px 0px;">          
          <span>{{ cuClass.classStartTime }}</span><br/>
          <span>{{ cuClass.ClassTitle }}</span> 
          <span> ( {{ cuClass.classID }} )</span>
        </ion-text>
      
  </ion-row>
</ion-grid> 
<!-------------------------------------->

    
         
<!-------------------------------------->
    <ion-button @click="switchRoll">
    <ion-icon slot="start" :icon="gitCompareOutline"  @click="switchRoll"></ion-icon>
    <span v-if="isStudent == true">student</span>
    <span v-if="isStudent != true">faculty</span>
    </ion-button>
  </base-layout>
</template>
<script>
//import { IonIcon } from "@ionic/vue";
//import {  IonRefresher, IonRefresherContent } from '@ionic/vue';

import {
  chevronForward,
  lockClosedOutline,
  refreshOutline,
  gitCompareOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";


export default {
  components: {
    //IonIcon,
  },
  data() {
    return {
      classes: [],
      currentDate: "",
      currentTime: "",
      chevronForward,
      lockClosedOutline,
      refreshOutline,
      gitCompareOutline,
      msg: "hi",
      userName: "",
      userRole: "",
      userID: "",
      isStudent : true,
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

    getCurrentTime(){
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
        console.log("current time is "+ time.toString());
      this.currentTime = time;
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
      console.log("got data");
      //this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
      //this.$store.commit("addUserID", this.userID?this.userID:"123");
    },

    updateTime(){
      setInterval(() => {
        this.getCurrentTime();
      }, 60000)
    },

  switchRoll(){
    this.isStudent = !this.isStudent;
  }


  

    //gotoPage(p) {
      //if (p==1) {router.push('/login');}
    //},
  },
  mounted: function () {
    //update table display onload
    this.getClass();
    let today = new Date();
    this.currentDate = today.toDateString();
    this.getCurrentTime();
    this.updateTime();
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