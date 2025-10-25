const userService = require('../../src/userService');

test('formatUserData should match snapshot', () => {
  const data = userService.formatUserData({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  });

  expect(data).toMatchSnapshot();
});
