// AMD with id & dependencies
define({
	HELLO : '雷吼',
	HELLO_ARROW: (number) => `雷吼 ${number} times`,
	HELLO_OBJECT : {
		HELLO : '雷吼',
		HELLO_FUNC :  function(number) {
			return `${this.HELLO} ${number} times`;
		}

	}
});
