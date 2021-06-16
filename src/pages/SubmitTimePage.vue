<template>
  <base-layout
    page-title="Student Attendance"
    page-default-back-link="/"
  >
    <h2>{{currentDate}}</h2>
    <h2>.{{cuClass}}.</h2>
    <h2>Time In</h2>
        <input type="text" value="9:00AM" />
        <h2>Time Out</h2>
        <input type="text" value="10:00AM" /><br/>
        <button>Submit</button>
  </base-layout>
</template>

<script>

export default {
  name: 'SubmitTime',
  props: ['cuClass','classProp','msg'],
  components: {
  },
  data() {
    return {
      currentDate: '',
      classID : '',
      gotit:''
      
    };
  },
  methods:{
        getTodayDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            return today;
        }
    },
    mounted: function () {
      //update table display onload
      this.gotit = this.msg;
      this.currentDate =this.getTodayDate();//  mm + '/' + dd + '/' + yyyy;   
      this.classID = this.$route.params.id;
      console.log("today is = "+this.currentDate);
    },
};
</script>