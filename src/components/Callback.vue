<template>
	<p>Please wait...</p>
   <!--  <div class="center" :style="{'background-image': 'url(' + require('../assets/background1.jpg') + ')','height':'100vh','width':'100vw'}">
        <h1 :style="{'color':'black'}">Convert your normal form into conversational form</h1>
        <br>
        <button v-on:click="create" :style="{'height':'35px'}">Create Form</button>
        <button v-on:click="infoconnect" :style="{'height':'35px'}">Infoconnect Login</button>
    </div> -->
</template>
<script>
    // import {APIService} from './APIService.js'
// const apiService=new APIService();
export default{
	name : 'callback',
	components:{

	},
	data(){
		return {
		};
	},
	methods:{
	},
	mounted(){
		const params = window.location.search;
		console.log(window.opener);
	   if (window.opener) {
	     // send them to the opening window
	     window.opener.postMessage(params);
	     // close the popup
	     window.close();
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