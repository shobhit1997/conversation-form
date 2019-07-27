<template>
<div class="center" :style="{'background-image': 'url(' + require('../assets/background1.jpg') + ')','height':'100vh','width':'100vw'}">
	
		<h1 :style="{'color':'black'}">Convert your normal form into conversational form</h1>
		<br>
		<button v-on:click="create" :style="{'height':'35px'}">Create Form</button>
</div>
</template>
<script>
// import {APIService} from './APIService.js'
// const apiService=new APIService();
export default{
	name : 'main',
	components:{

	},
	data(){
		return {
	
		};
	},
	methods:{
		create(){
			if(localStorage.getItem('x-auth')){
				window.location.href="/createForm";
			}
			else{
				window.location.href="/login"
			}
		}
	}
}
</script>

<style type="text/css">
	.center {
  padding: 70px 0;
  border: 3px solid green;
  text-align: center;
}
</style>