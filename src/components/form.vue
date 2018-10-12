<template>
<div class="chat">
<div class="chat__sidebar">
  <h3>People</h3>
  <div id="users"></div>
</div>

<div class="chat__main">
<ol class="chat__messages" id="messages" ref="container">
  
</ol>
<div class="chat__footer">
<form id="message-form"  @submit.prevent="send">
  <input :type="type" placeholder="ans" autofocus autocomplete="off" v-model="ans" :disabled="disabled">
  <button :disabled="disabled">Send</button>
</form>
</div>
</div>
</div>
</template>
<script>
import Vue from 'vue'
import {APIService} from './APIService.js'
import singleAns from './singleAnsComponent'
import multipleAns from './multipleAnsComponent'
const apiService=new APIService();
export default{
	name : 'form',
	components:{
    singleAns,
    multipleAns
	},
	data(){
		return {
		data:null,
    index:0,
    ans:null,
    answers:{},
    type:"text",
    disabled:false
		}
	},
	methods:{
    addComponent(){
      if(this.index<this.data.questions.length){
        let type=this.data.questions[this.index].type
        if(type==='text'){
          this.type="text";
          this.disabled=false;
          this.addSingleComponent(); 
        }else if(type==='multiple-choice'){
          this.addMultipleComponent();
          this.disabled=true;
        }else if(type==='phone'){
          this.addSingleComponent();
          this.type="tel"
          this.disabled=false;
        }else if(type==='admission-no'){
          this.type="text";
          this.disabled=false;
          this.addSingleComponent();
        }else if(type==='email'){
          this.type="email";
          this.disabled=false;
          this.addSingleComponent();
        }
      }else{
        this.addFinalComponent();
      }
    },
    send(){
     var ComponentClass = Vue.extend(singleAns)
        var instance = new ComponentClass({
            propsData: { question: this.ans,from:"user" }
        })
        instance.$mount()   
        this.$refs.container.appendChild(instance.$el)
        this.answers[this.data.questions[this.index].description]=this.ans;
        this.index++;
        this.ans=null;
        this.addComponent();
    },
    send1(data){
      this.ans=data;
      this.send();
    },
    addSingleComponent(){
      var ComponentClass = Vue.extend(singleAns)
        var instance = new ComponentClass({
            propsData: { question: this.data.questions[this.index].description,from:"ncs" }
        })
        instance.$mount()   
        this.$refs.container.appendChild(instance.$el)
      },
      addMultipleComponent(){
        var ComponentClass = Vue.extend(multipleAns)
        var instance = new ComponentClass({
            propsData: { question: this.data.questions[this.index].description,from:"ncs",options:this.data.questions[this.index].options }
        })
        instance.$on('selected',this.send1);  
        instance.$mount()
           
        this.$refs.container.appendChild(instance.$el)
      },
      addInitialComponent(){
        var ComponentClass = Vue.extend(multipleAns)
        var instance = new ComponentClass({
            propsData: { question: "Do you want to register for this event",from:"ncs",options:["Yes","No"] }
        })
        instance.$on('selected',this.addInitialComponentHandler);  
        instance.$mount()
           
        this.$refs.container.appendChild(instance.$el)
      },
      addInitialComponentHandler(data){

        if(data=="Yes"){
          this.addComponent();
        }
        else{
          var ComponentClass = Vue.extend(singleAns)
          var instance = new ComponentClass({
            propsData: { question: "Thankyou for visiting",from:"ncs" }
          })
          instance.$mount()
          this.$refs.container.appendChild(instance.$el)
          this.disabled=true;
        }

      },
      addFinalComponent(){
        var ComponentClass = Vue.extend(multipleAns)
        var instance = new ComponentClass({
            propsData: { question: "Do you want to submit the form",from:"ncs",options:["Yes","No"] }
        })
        instance.$on('selected',this.addFinalComponentHandler);  
        instance.$mount()
           
        this.$refs.container.appendChild(instance.$el)
      },
      addFinalComponentHandler(data){

        if(data=="Yes"){

          var req={
            _id:this.data._id,
            response:this.answers
          };
          apiService.submitForm(req).then((data)=>{
            console.log(data.data);
            var ComponentClass = Vue.extend(singleAns)
            var instance = new ComponentClass({
              propsData: { question: "Thankyou for registering!",from:"ncs" }
            })
            instance.$mount()
            this.$refs.container.appendChild(instance.$el)
            this.disabled=true;
          });
        }
        else{
          var ComponentClass = Vue.extend(singleAns)
          var instance = new ComponentClass({
            propsData: { question: "Thankyou for visiting",from:"ncs" }
          })
          instance.$mount()
          this.$refs.container.appendChild(instance.$el)
          this.disabled=true;
        }

      }
	},
	mounted(){
		apiService.getForm(this.$route.params.id).then((data)=>{
				this.data=data.data;
				// alert(data);
        this.addInitialComponent();
		});

	}
}
</script>
<style>
  button,button:hover{border:none;color:#fff;padding:10px}.chat__messages,.chat__sidebar ul{list-style-type:none}*{box-sizing:border-box;margin:0;padding:0;font-family:HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:300;font-size:.95rem}li,ul{list-style-position:inside}h3{font-weight:600;text-align:center;font-size:1.5rem}button{background:#265f82;cursor:pointer;transition:background .3s ease}button:hover{background:#1F4C69}button:disabled{cursor:default;background:#698ea5}.centered-form{display:flex;align-items:center;height:100vh;width:100vw;justify-content:center;background:-moz-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-webkit-gradient(linear,left top,right bottom,color-stop(0,rgba(49,84,129,1)),color-stop(100%,rgba(39,107,130,1)));background:-webkit-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-o-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-ms-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:linear-gradient(325deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%)}.centered-form__form{background:rgba(250,250,250,.9);border:1px solid #e1e1e1;border-radius:5px;padding:0 20px;margin:20px;width:230px}.form-field{margin:20px 0}.form-field>*{width:100%}.form-field label{display:block;margin-bottom:7px}.form-field input,.form-field select{border:1px solid #e1e1e1;padding:10px}.chat{display:flex}.chat__sidebar{overflow-y:scroll;width:260px;height:100vh;background:-moz-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-webkit-gradient(linear,left top,right bottom,color-stop(0,rgba(49,84,129,1)),color-stop(100%,rgba(39,107,130,1)));background:-webkit-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-o-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:-ms-linear-gradient(125deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%);background:linear-gradient(325deg,rgba(39,107,130,1) 0,rgba(49,84,129,1) 100%)}.chat__footer,.chat__sidebar li{background:#e6eaee;padding:10px}.chat__sidebar h3{color:#e6eaee;margin:10px 20px;text-align:left}.chat__sidebar li{border:1px solid #e1e1e1;border-radius:5px;margin:10px}.chat__main{display:flex;flex-direction:column;height:100vh;width:100%}.chat__messages{flex-grow:1;overflow-y:scroll;-webkit-overflow-scrolling:touch;padding:10px}.chat__footer{display:flex;flex-shrink:0}.chat__footer form{flex-grow:1;display:flex}.chat__footer form *{margin-right:10px}.chat__footer input{border:none;padding:10px;flex-grow:1}.message{padding:10px}.message__title{display:flex;margin-bottom:5px}.message__title h4{font-weight:600;margin-right:10px}.message__title span{color:#999}@media (max-width:600px){*{font-size:1rem}.chat__sidebar{display:none}.chat__footer{flex-direction:column}.chat__footer form{margin-bottom:10px}.chat__footer button{margin-right:0}}
</style>
