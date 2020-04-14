import axios from 'axios';
const API_URL = 'http://cform.shobhitagarwal.me';
export class APIService{

constructor(){
}
getForm(id){

	const url = `${API_URL}/api/form/${id}`;
	return axios.get(url);
}
login(req){
	const url = `${API_URL}/api/user/login`;
	return axios.post(url,req);
}
loginInfoconnect(req){
	const url = `${API_URL}/api/oauth/login/infoconnect`;
	var headers={
			"Content-Type":"application/json",
			'crossDomain': true
	};
	var options={
		headers
	}
	return axios.post(url,req,options);
}
loginGoogle(req){
	const url = `${API_URL}/api/oauth/login/google`;
	return axios.post(url,req);
}
submitForm(req){
	const url = `${API_URL}/api/form/submit`;
	return axios.post(url,req);
}
createForm(obj){
	const url = `${API_URL}/api/form/createForm`;
	var headers={
			"Content-Type":"application/json",
			"username":localStorage.getItem('username'),
			"token":localStorage.getItem('token'),
			"x-auth":localStorage.getItem('x-auth'),
			'crossDomain': true

	};
	var options={
		headers
	}
	return axios.post(url,obj,options);
}
getMyForms(){
	const url = `${API_URL}/api/form/myforms`;
	var headers={
			"Content-Type":"application/json",
			"username":localStorage.getItem('username'),
			"token":localStorage.getItem('token'),
			"x-auth":localStorage.getItem('x-auth'),
			'crossDomain': true
	};
	var options={
		headers
	}
	return axios.get(url,options);
}
getResponses(id){
	const url = `${API_URL}/api/form/getResponse/${id}`;
	var headers={
			"Content-Type":"application/json",
			"username":localStorage.getItem('username'),
			"token":localStorage.getItem('token'),
			"x-auth":localStorage.getItem('x-auth'),
			'crossDomain': true
	};
	var options={
		headers,
		responseType: 'blob'
	}
	return axios.get(url,options);
}
}
