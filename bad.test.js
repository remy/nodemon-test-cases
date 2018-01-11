describe('example of a failing test', () => {
  it('should not throw', () => {
    // throw new Error('this will fail');
    console.assert(true);
  });

  it('throws a second test', () => {
    console.assert(true);
    // throw new Error('this also fails');
  });
});
