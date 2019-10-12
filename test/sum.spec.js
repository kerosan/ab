const {sum} = require('../src/public/js/sum')

describe('sum test', () => {
	it('add', () => {
		expect(sum(3, 2)).toBe(5)
	})
})