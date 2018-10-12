<template>
<div class="form-group">
    <label for="title">Option {{count}}</label>
    <input type="text" class="form-control" placeholder="Enter Option" v-model="option">
 </div>
</template>
<script>

export default{
	name : 'option',
	props:['count'],
	components:{

	},
	data(){
		return {
			option:''
		}
	},
	watch: {
    // whenever question changes, this function will run
    option: function (newOption, oldOption) {
    	this.$emit('option',this.option,this.count);
    }
  }
}
</script>