module.exports = {
  up: queryInterface => {
    return queryInterface.dropTable('meetup');
  },

  down: queryInterface => {
    return queryInterface.createTable('meetup');
  },
};
