<template>
  <div class="box">
<table >
    <thead>
      <tr>
        <th>Title</th>
        <th>Responses</th>
        <th>Download</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="form in forms">
        <td>{{form.name}}</td>
        <td>{{form.responses}}</td>
        <td><button @click="download(form.shortUrl)">Download</button></td>
        <td>{{form.displayUrl}}</td>
      </tr>
    </tbody>
  </table>
</div>  
</template>
<script>
import {APIService} from './APIService.js'
const apiService=new APIService();
export default{
	name : 'myforms',
	components:{

	},
	data(){
		return {
			forms:null
		};
	},
	methods:{
		download(shortUrl){
			apiService.getResponses(shortUrl).then((data)=>{
				const url = window.URL.createObjectURL(new Blob([data.data]));
   				const link = document.createElement('a');
   				link.href = url;
   				link.setAttribute('download', 'response.xls'); //or any other extension
   				link.click();
			});
		}
	},
	mounted(){
		apiService.getMyForms().then((data)=>{
			this.forms=data.data;
      this.forms.forEach(form=>{
        form.displayUrl=window.location.origin+'/form/'+form.shortUrl;
      });
		});
	}
}
	
</script>

<style type="text/css">
	body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}


.center {
  padding: 70px 0;
  text-align: center;
}

.box {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color:#d9d9d9;
    
}

</style>