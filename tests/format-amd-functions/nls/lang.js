// AMD
define(function(){
	return {
		root: {
			HELLO : 'world',
			HELLO_ARROW: (number) => `world ${number} times`,
			HELLO_OBJECT : {
				HELLO : 'world',
				HELLO_FUNC :  function(number) {
					return `${this.HELLO} ${number} times`;
				}

			}
		},
		'zh-cn': true,
		'zh-hk': true,
		'en': true
	};

});
