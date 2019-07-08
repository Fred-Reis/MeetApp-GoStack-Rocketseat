module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('subscriptions', 'updated_at', {
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('subscriptions', 'updated_at');
  },
};
