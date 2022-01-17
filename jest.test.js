test('test1 common matcher', () => {
  expect( 2 + 2 ).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test1 to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})


test('test1 number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

// test('test1 object', () => {
//   expect({name: 'viking'}).toBe({name: 'viking'})
//   expect({name: 'viking'}).toEqual({name: 'viking',age: 8})
// })
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });