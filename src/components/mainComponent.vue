<template>
<div style="align-items: center;">
	
		<h3>Convert your normal form into conversational form</h3>
		<br>
		<button v-on:click="create">Create Form</button>
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