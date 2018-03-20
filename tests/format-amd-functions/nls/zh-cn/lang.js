// AMD with dependencies
define({
	HELLO : '你好',
	HELLO_ARROW: (number) => `你好 ${number} times`,
	HELLO_OBJECT : {
		HELLO : '你好',
		HELLO_FUNC :  function(number) {
			return `${this.HELLO} ${number} times`;
		}

	}
});
