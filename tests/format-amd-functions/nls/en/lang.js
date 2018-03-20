// AMD with object
define({
	HELLO : 'world-en',
	HELLO_ARROW: (number) => `world-en ${number} times`,
	HELLO_OBJECT : {
		HELLO : 'world-en',
		HELLO_FUNC :  function(number) {
			return `${this.HELLO} ${number} times`;
		}

	}
});
