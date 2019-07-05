module.exports = {
  up: queryInterface => {
    return queryInterface.dropTable('meetups');
  },

  down: queryInterface => {
    return queryInterface.createTable('meetups');
  },
};
