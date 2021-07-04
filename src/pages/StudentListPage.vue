<template>
    <base-layout 
        page-title="Faculty Acceptance"
        page-default-back-link="classList"
    >
        <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Faculty Acceptance</h4>-->
          <h2 style="margin:0px;font-weight:bold;">{{ ClassTitle }} ({{ classID }})</h2>
          <h4 style="margin:0px;">{{ currentDate }}</h4>
          <h4 style="margin:0px;">{{classStartTime}} - {{classEndTime}}</h4>
        </ion-col>
      </ion-row>

    </ion-grid>



    <ion-list>
        <ion-item 
            v-for="student in students" 
            :key="student.studentID"
            ><ion-grid>
            <ion-row ion-no-padding>
                <ion-col size="2"><div><ion-img
            src="../../assets/default-avatar.png"
            
          ></ion-img></div></ion-col>
                <ion-col size="10">
                    <div><span style="font-weight:bold;">{{student.studentFirstName}} {{student.studentLastName}} </span></div>
                    <ion-row style="align-content: flex-start;" v-if="student.isPresent">
                        <ion-col size="6" v-for="time in student.timeInOut" :key="time.studentID"><div>{{time}}</div></ion-col>
                        <!--
                        <ion-col size="6"><div>10:30 AM</div></ion-col>                    
                        <ion-col size="6"><div>10:40 AM</div></ion-col>
                        <ion-col size="6"><div>11:00 AM</div></ion-col>
                        -->
                    </ion-row>
                    <ion-row style="align-content: flex-start;" v-if="!student.isPresent">
                        <ion-col size="12"><span style="color:red;">None</span></ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>    
        </ion-grid>
             
        </ion-item> 
    </ion-list>

    <ion-grid>
    <ion-row>
      <ion-col size="12">
          <ion-button expand="block" @click="onSubmit">
      <ion-icon slot="start" :icon="paperPlaneOutline"></ion-icon>
      Accept
    </ion-button>
      </ion-col></ion-row>
</ion-grid> 
    </base-layout>
</template>
<script>
import { IonList, IonItem, toastController } from '@ionic/vue';
import {
  paperPlaneOutline,
  refreshOutline,
} from "ionicons/icons";
export default {

    components:{
        IonList, IonItem, 
    },
    data() {
        return {
            classes:[],
            students:[],
            currentDate : '',
            msg:'hi',
            userName: '',
            userRole:'',
            userID:'',
            classID:'',
            ClassTitle:'',
            refreshOutline,
            paperPlaneOutline,            
            classStartTime: "",
            classEndTime: "",
        }
    },
    methods:{
            getTodayDate() {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();
                today =
                    mm +
                    "/" +
                    dd +
                    "/" +
                    yyyy +
                    String(today.getHours()).padStart(2, "0") +
                    String(today.getMinutes()).padStart(2, "0");

                //this.currentTime = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
                return today;
                },
                getCurrentTime() {
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

        getStudents(){
            this.students = this.$store.getters.cuClass(this.$route.params.id).students;  
            console.log(this.students);   
            this.classID  = this.$store.getters.cuClass(this.$route.params.id).classID;   
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
            this.classStartTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classStartTime;
            this.classEndTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classEndTime;
        },

        onSubmit(){
            this.openToastSuccessful();
        },
            async openToastSuccessful() {
            const toast = await toastController
                .create({
                message: 'Submit Successful.',
                position: 'top',
                duration: 1000,
                color: 'success'
                })
            toast.present();
            toast.onDidDismiss().then(()=>{
                this.$router.go(-1);
            })
            },
            

            async openToastFailed() {
            const toast = await toastController
                .create({
                message: 'Failed submit, server error, please try again.',
                position: 'top',
                duration: 1000,
                color: 'danger'
                })
            toast.present();
            },
    },
    mounted: function () {
      //update table display onload
      this.getStudents();
      let today = new Date();
      this.currentDate = today.toDateString();
  }
    
}
</script>
<style>
ion-toggle {
  --background: red;
  --background-checked: green;
}
</style>