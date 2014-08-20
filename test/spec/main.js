// Note: In practice, unit tests act on a specific module, in this case, you
// would require() the desired module using a relative file path like so:
//
// var MyClass = require('../../src/htdocs/js/some/package/MyClass');

describe('main', function () {
	it('no-op', function () {
		expect(true).toBe(true);
	});
});