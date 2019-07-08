module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('subscriptions', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),

      queryInterface.addColumn('subscriptions', 'canceled_at', {
        type: Sequelize.DATE,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('subscriptions', 'created_at'),
      queryInterface.removeColumn('subscriptions', 'canceled_at'),
    ]);
  },
};
