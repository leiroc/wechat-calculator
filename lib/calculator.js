
function calculator(intxt, callback) {
	return new Promise(function (resolve, reject) {
	    var a = intxt;
		try {
			intxt = intxt.replace(/=|等|等于|\?/, '');
			intxt = intxt.replace(/加/g, '+').replace(/减/g, '-').replace(/乘/g, '*').replace(/除/g, '/');
			a = eval(intxt);
		} catch(e){
			// console.log('========error', e);
		}
	    resolve(a);
  	});
}

exports.calculator = calculator;