module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('subscriptions', 'data_meetup', {
      type: Sequelize.DATE,
      alowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('subscriptions');
  },
};
