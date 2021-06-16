<template>
    <base-layout page-title="Class Schedule">    
    <h1>Today</h1>
    <h2>{{currentDate}}</h2>
    <ion-list>
        <ion-item 
            v-for="cuClass in classes" 
            :key="cuClass.id"
            :router-link="`/submitTime/${cuClass.classID}`"
            >
            {{cuClass.ClassTitle}} - start at {{cuClass.timeIn}}
            <!--<ion-button @click="router.push('/submitTime'+cuClass.classID, cuClass)">NEXT</ion-button>-->
   
            <ion-icon :icon="chevronForward" size="small" slot="end"></ion-icon></ion-item>
    </ion-list>
    </base-layout>
</template>
<script>
import { IonList, IonItem, IonIcon } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';

export default {

    components:{
        IonList, IonItem, IonIcon,
    },
    data() {
        return {
            classes:[
                {id:1, classID:'1234', ClassTitle:'Med class 1234',date:'Mon May 24, 2021', timeIn:'9:00 AM', timeOut:'10:00AM'},
                {id:2, classID:'534', ClassTitle:'History class 534',date:'Mon May 24, 2021', timeIn:'11:00 AM', timeOut:'12:00PM'},                
                {id:3, classID:'134', ClassTitle:'Physics class 134',date:'Mon May 24, 2021', timeIn:'2:00 PM', timeOut:'3:00PM'},                
                {id:4, classID:'341', ClassTitle:'Math class 341',date:'Mon May 24, 2021', timeIn:'4:00 PM', timeOut:'5:00PM'}
            ],
            currentDate : '',
            chevronForward,
            msg:'hi'
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

        getClass(){

        }
    },
    mounted: function () {
      //update table display onload
      //this.classes = this.getClass();
      this.currentDate =this.getTodayDate();
      console.log("today is = "+this.currentDate);
  }
    
}
</script>
