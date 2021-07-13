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
  <ion-row style="background:#54595f;"
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

<ion-grid v-if="isStudent == true">
  <ion-row style="background:#54595f;"
    v-for="cuClass in studentClasses"
    :key="cuClass.id"
    class="course-block"
    @click="router.push(`/submitTime/${cuClass.courseNumber}`)"
  >
        <ion-text style="margin: 5px 0px;">          
          <span>{{ cuClass.startDateTime }}</span><br/>
          <span>{{ cuClass.title }} </span>  
          <span> ( {{ cuClass.courseNumber }} )</span>
        </ion-text>
      
  </ion-row>
</ion-grid> 

<!-------------------------------------->

<ion-grid v-if="isStudent != true">
  <ion-row style="background:#54595f;"
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
    <ion-button @click="switchRole">
    <ion-icon slot="start" :icon="gitCompareOutline"  @click="switchRole"></ion-icon>
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
      studentClasses: [],
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

  switchRole(){
    this.isStudent = !this.isStudent;
     var myToken = this.$store.getters.getToken;
      console.log("token is "+myToken);
      this.getRole();
  },

  getRole(){
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                  'Authorization': 'Bearer '+ this.$store.getters.getToken}
      };
      fetch('https://qa2-web.scansoftware.com/cafeweb/api/authenticate/whoAmI', requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log("isInstructor = " + data.isInstructor);
          console.log("isStudent = " + data.isStudent);
          if( data.isInstructor == false && data.isStudent == true) {
            this.getStudentClasses();
          } else if ( data.isInstructor == true && data.isStudent == false) {
            this.getInstructorClasses();
          }


          //this.postId = data.id;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
          this.$router.push('/login');
        });
    },

  // build student's class list 
  getStudentClasses(){
      var myToken = this.$store.getters.getToken;
      console.log("token is "+myToken);
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                  'Authorization': 'Bearer '+ this.$store.getters.getToken}
      };
      fetch('https://qa2-web.scansoftware.com/cafeweb/api/student/classes', requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          console.log("classes = " + JSON.stringify(data.classes));
          this.studentClasses =[];
          this.studentClasses = data.classes;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
          this.$router.push('/login');
        });
  },
  
  // build instructor's class list
  getInstructorClasses(){

  }

    //gotoPage(p) {
      //if (p==1) {router.push('/login');}
    //},
  },
  mounted: function () {
    // check user token
    // if work getRole
    // else push to login
    // get role
    this.getRole();

    //update table display onload
    this.getClass();
    let today = new Date();
    this.currentDate = today.toDateString();
    this.getCurrentTime();
    this.updateTime();
    console.log("today is = " + this.currentDate);
    console.log("classlistpage mounted");
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
  },
  beforeMount:function () {
    console.log('classlistpage beforeMount');
  },
  Created:function () {
    console.log('classlistpage Created');
  },
  Updated:function () {
    console.log('classlistpage Updated');
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