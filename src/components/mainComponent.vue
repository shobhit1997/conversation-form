<template>
    <div class="center" :style="{'background-image': 'url(' + require('../assets/background1.jpg') + ')','height':'100vh','width':'100vw'}">
        <h1 :style="{'color':'black'}">Convert your normal form into conversational form</h1>
        <br>
        <button v-on:click="create" :style="{'height':'35px'}">Create Form</button>
        <button v-on:click="infoconnect" :style="{'height':'35px'}">Infoconnect Login</button>
        <button v-on:click="google" :style="{'height':'35px'}">Google Login</button>
    </div>
</template>
<script>
import {APIService} from './APIService.js'
const apiService=new APIService();
export default{
	name : 'main',
	components:{

	},
	data(){
		return {
			previousUrl:null,
			windowObjectReference:null
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
		},
		receiveInfoMessage(event){
			 // Do we trust the sender of this message? (might be
			 // different from what we originally opened, for example).
			 if (event.origin !== window.location.origin) {
			   return;
			 }
			 // console.log(event);
			const { data } = event;
			const code=this.getUrlParameter(data,"code");
			
			if(code && code.length>0)
				{apiService.loginInfoconnect({code}).then(res=>{ 
					console.log(res);
					localStorage.setItem("name",res.data.name);
					localStorage.setItem("x-auth",res.headers["x-auth"])
				});
			}
			window.removeEventListener('message', this.receiveMessage);

		},
		receiveGoogleMessage(event){
			 // Do we trust the sender of this message? (might be
			 // different from what we originally opened, for example).
			 if (event.origin !== window.location.origin) {
			   return;
			 }
			 // console.log(event);
			const { data } = event;
			const code=this.getUrlParameter(data,"code");
			
			if(code && code.length>0)
				{apiService.loginGoogle({code}).then(res=>{ 
					console.log(res);
					localStorage.setItem("name",res.data.name);
					localStorage.setItem("x-auth",res.headers["x-auth"])
				});
			}
			window.removeEventListener('message', this.receiveInfoMessage);

		},
		getUrlParameter(url,name) {
			    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
			    var results = regex.exec(url);
			    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
		},
		infoconnect(){
			let url="http://oauth.shobhitagarwal.me/login?q=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SUQiOiJCYWRSb2dnZXIxLmluZm9jb25uZWN0LmluIiwicHJvamVjdFNlY3JldCI6IjcwMWE5ZDI3Yzg5ZDdhOTVjNWIzYWRmN2IwOTZiN2E3N2VhYWVhMzBmNzM2YmZhMTVkMTJiODIzZmRiMjc2NjIiLCJpYXQiOjE1ODY4ODgwNjd9.tkSiLNYn40U3JvPdAzd1vT5Kz8U33ySzTszwKSDzx6I";
			let name="infoconnect-login"
			window.removeEventListener('message', this.receiveInfoMessage);
		   // window features
		   const strWindowFeatures =
		     'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

		   if (this.windowObjectReference === null || this.windowObjectReference.closed) {
		     /* if the pointer to the window object in memory does not exist
		      or if such pointer exists but the window was closed */
		     this.windowObjectReference = window.open(url, name, strWindowFeatures);
		   } else if (this.previousUrl !== url) {
		     /* if the resource to load is different,
		      then we load it in the already opened secondary window and then
		      we bring such window back on top/in front of its parent window. */
		     this.windowObjectReference = window.open(url, name, strWindowFeatures);
		     this.windowObjectReference.focus();
		   } else {
		     /* else the window reference must exist and the window
		      is not closed; therefore, we can bring it back on top of any other
		      window with the focus() method. There would be no need to re-create
		      the window or to reload the referenced resource. */
		     this.windowObjectReference.focus();
		   }

		   // add the listener for receiving a message from the popup
		   window.addEventListener('message', event => this.receiveInfoMessage(event), false);
		   // assign the previous URL
		   this.previousUrl = url;
				
		},
		google(){
			let url="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=328013180232-4tbbirno1l79l8ii917i0f9u4n93gdvu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fbadrogger.shobhitagarwal.me%2Fcallback";
			let name="google-login"
			window.removeEventListener('message', this.receiveGoogleMessage);
		   // window features
		   const strWindowFeatures =
		     'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

		   if (this.windowObjectReference === null || this.windowObjectReference.closed) {
		     /* if the pointer to the window object in memory does not exist
		      or if such pointer exists but the window was closed */
		     this.windowObjectReference = window.open(url, name, strWindowFeatures);
		   } else if (this.previousUrl !== url) {
		     /* if the resource to load is different,
		      then we load it in the already opened secondary window and then
		      we bring such window back on top/in front of its parent window. */
		     this.windowObjectReference = window.open(url, name, strWindowFeatures);
		     this.windowObjectReference.focus();
		   } else {
		     /* else the window reference must exist and the window
		      is not closed; therefore, we can bring it back on top of any other
		      window with the focus() method. There would be no need to re-create
		      the window or to reload the referenced resource. */
		     this.windowObjectReference.focus();
		   }

		   // add the listener for receiving a message from the popup
		   window.addEventListener('message', event => this.receiveGoogleMessage(event), false);
		   // assign the previous URL
		   this.previousUrl = url;
				
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