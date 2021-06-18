<template>
    <base-layout 
        page-title="Faculty Acceptance"
        page-default-back-link="/"
    >    
    <ion-grid>
            <ion-row>
                <ion-col size="12">
                    <h1>class id : {{classID}} - {{ClassTitle}}.</h1>  
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="12">
                    <h1>{{currentDate}}</h1>  
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="12">
                    <h2>(9:00AM - 10:00AM)</h2>
                </ion-col>
            </ion-row>
        </ion-grid>
    <ion-row>
                <ion-col size="4">
                    <h3>Name</h3>  
                </ion-col>
                <ion-col size="4">
                    <h3>Time In</h3>  
                </ion-col>
                <ion-col size="4">
                    <h3>Time Out</h3>  
                </ion-col>
            </ion-row>    
    <ion-list>
        <ion-item 
            v-for="student in students" 
            :key="student.studentID"
            ><ion-grid>
            <ion-row ion-no-padding>
                <ion-col size="4"><div>
            {{student.studentFirstName}} {{student.studentLastName}} </div>
                </ion-col>
                <ion-col size="4"><div>
            <ion-datetime display-format="h:mm A" disabled="false"
            minute-values="0,10,20,30,40,50" value="1990-02-19T09:00"></ion-datetime></div>
                </ion-col>
                <ion-col size="4"><div>            
            <ion-datetime display-format="h:mm A" 
            minute-values="0,10,20,30,40,50" value="1990-02-19T10:00"></ion-datetime></div>
                </ion-col>
             </ion-row>    </ion-grid>
             
        </ion-item> 
    </ion-list>
    <ion-button expand="full">Accept</ion-button>
    </base-layout>
</template>
<script>
import { IonList, IonItem } from '@ionic/vue';

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
            ClassTitle:''
        }
    },
    methods:{
        getTodayDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            var hours = today.getHours();
            var minutes = today.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            today = mm + '/' + dd + '/' + yyyy + ' -- ' + hours + ':' + minutes + ' ' + ampm;            
            return today;
        },

        getStudents(){
            this.students = this.$store.getters.cuClass(this.$route.params.id).students;     
            this.classID  = this.$store.getters.cuClass(this.$route.params.id).classID;   
            this.ClassTitle = this.$store.getters.cuClass(this.$route.params.id).ClassTitle; 
        }
    },
    mounted: function () {
      //update table display onload
      this.getStudents();
      this.currentDate =this.getTodayDate();
  }
    
}
</script>
