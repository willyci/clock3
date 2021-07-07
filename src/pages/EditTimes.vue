<template>
    <base-layout 
        page-title="Edit Times"
        page-default-back-link="studentList"
    >
        <ion-grid>
      <ion-row>
        <ion-col size="12" style="text-align: center">
          <!--<h4>Faculty Acceptance</h4>-->
          <div><ion-img src="../../assets/default-avatar.png" style="width:100px;margin: auto;"></ion-img></div>
          <h2 style="margin:0px;font-weight:bold;">{{student.studentFirstName}} {{student.studentLastName}}</h2>
        </ion-col>
      </ion-row>
    </ion-grid>



    <ion-list>
        <ion-item> 
                <ion-col size="10">
                    <ion-row style="align-content: flex-start;" v-if="student.isPresent">
                        <ion-col size="12" v-for="(time, index) in student.timeInOut" :key="time.studentID">
                            <div><span v-if="index%2 === 0 " style="display: inline-block;min-width:40px;">IN</span>
                                <span v-if="index%2 != 0 " style="display: inline-block;min-width:40px;">OUT</span>
                                <span style="display: inline-block;min-width:100px;">{{time}} </span>
                                <ion-button  @click="removeSelectedTime(index)" style="height:24px;">
                                    <ion-icon  slot="icon-only" :icon="closeCircleOutline"></ion-icon>
                                    </ion-button>
                            </div>
                        
                        </ion-col>
                        <ion-col size="12">
                        <ion-button  @click="addNewTime(student)" style="width:120px;"><ion-icon  slot="start" :icon="addCircleOutline"></ion-icon>Add</ion-button>
                        </ion-col>
                        <!--<ion-datetime display-format="h:mm A" minute-values="0,10,20,30,40,50" :value="time" id="tt"></ion-datetime>-->
                    </ion-row>
                </ion-col>

        </ion-item> 
    </ion-list>

    <ion-grid>
    <ion-row>
      <ion-col size="12">
          <ion-button expand="block" @click="onSubmit">
      <ion-icon slot="start" :icon="createOutline"></ion-icon>
      Update
    </ion-button>
      </ion-col></ion-row>
</ion-grid> 
    </base-layout>
</template>
<script>
import { IonList, IonItem, toastController } from '@ionic/vue';
import { createOutline, closeCircleOutline, addCircleOutline  } from "ionicons/icons";

export default {
    props:{
        studentID:{
            type:String,
            required:true,
        },
        classID:{
            type:String,
            required:true,
        },
    },
    components:{
        IonList, IonItem, 
    },
    data() {
        return {
            students:[],
            student:"",
            classes:[],
            timeInOut:[],
            userName: '',
            createOutline,
            closeCircleOutline,
            addCircleOutline
        }
    },
    methods:{
            
        search(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].studentID === nameKey) {
                    return myArray[i];
                }
            }
        },

        getStudents(){
            
            this.students = this.$store.getters.cuClass(this.$route.params.cid).students;  
            console.log(this.students);   
            this.student = this.search(this.$route.params.sid, this.students); 
            console.log(this.student);
            /*this.classID  = this.$store.getters.cuClass(this.$route.params.id).classID;   
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle;
            this.classStartTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classStartTime;
            this.classEndTime = this.$store.getters.cuClass(
                this.$route.params.id
            ).classEndTime;
            */
        },

        // remove selected time, update list
        removeSelectedTime(index){
            // pick selected time
            console.log(index);

        },
        // add time to end of list, update list
        addNewTime(student){
            // new time add to array, 
            // bring up time picket
            console.log(student);
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
      console.log("classID = "+this.$route.params.cid);
      console.log("studentID = "+this.$route.params.sid);
  }
    
}
</script>