describe('page', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:3003')
	})

	it('should be titled "AB"', async () => {
		const title = await page.title()
		expect(title).toMatch('AB')
	})

	it('reset button exists', async () => {
		const btnText = await page.$eval('#reset', el => el.dataset.hook)
		expect(btnText).toBe('start')
	})

	it('Root exists', async () => {
		const root = await page.$eval('#root', el => el.tagName.toLowerCase())
		expect(root).toBe('div')
	})
})