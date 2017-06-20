module.exports = {
	env:{
		browser:true,
		commonjs:true,
		es6:true,
		node:true
	},
	extends:'eslint:recommended',
	parserOptions:{
		sourceType:'module'
	},
	rules:{
		'indent': [2, 'tab'],
		quotes:['error','single'],
		'no-unused-vars':['warn'],
		'no-console':0
	}
};
