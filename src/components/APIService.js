import axios from 'axios';
const API_URL = 'http://localhost:8000';
export class APIService{

constructor(){
}
getForm(id){

	const url = `${API_URL}/api/form/${id}`;
	// alert(url);
	// var headers={
	// 		"Content-Type":"application/json",
	// 		"username":"16cse001",
	// 		"token":"fb6c1426cf3afe4a84ae321a3a7e36ff8283c047",
	// 		"x-auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE2Y3NlMDAxIiwiZ3JvdXAiOiJzdHVkZW50IiwidG9rZW4iOiJmYjZjMTQyNmNmM2FmZTRhODRhZTMyMWEzYTdlMzZmZjgyODNjMDQ3Iiwia2V5IjoiYmZqYnNnYmZzYmNrYnprY25remVmY3NuZGt4a3NuZGtiY2tzejN5NThnNDM4N2VkZyIsImlhdCI6MTUzODkxODI5Mn0.ZS6Ux9A_AZl7za7gcrx32BXnYcwy1W89bxcg0c2Ohz4"
	// };
	// var options={
	// 	headers
	// }
	return axios.get(url);
}
// login(req){
// 	const url = `${API_URL}/api/login`;
// 	return axios.post(url,req);
// }
submitForm(req){
	const url = `${API_URL}/api/form/submit`;
	return axios.post(url.req);
}
}
