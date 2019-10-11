describe('page', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:3003');
	});

	it('should be titled "title"', async () => {
		await expect(page.title()).resolves.toMatch('title');
	});


	it('reset button exists', async () => {
		const btnText = await page.$eval('#reset', el => {
			console.log(el);
			return el.innerText
		})
		expect(btnText).toBe('reset');
	});

	it('field exists', async ()=> {
		expect(await page.$eval('#field', el => {
			console.log(el);
			return el.tagName.toLowerCase()
		})).toBe('div');
	});
});