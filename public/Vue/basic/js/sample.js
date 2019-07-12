var newInstance = new Vue({
    el: "#app",

    data:{
        count:0,
        array: ["kongo", "hiei", "haruna", "kirishima"],
        text:"",
        checked:false,
        checkedNames:[],
        modulation:"",
        hisyo:"",
        kantai:[],
    },

    methods: {
        showalert: function(){
           alert('hoge');
        }
    },

    computed: {
        odd(){
            return this.checkedNames.filter((v, i) => {
                if(i%2==0){
                    return v;
                }
            })
        },
        oddd(){
            return this.kantai.filter((v, i) => {
                if(i%2==0){
                    return v;
                }
            })
        }
    },
})

Vue.component('buttonCounter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
  
var comp = new Vue({
    el: "#buttonComponent"
})