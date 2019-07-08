module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('subscriptions', 'data_meetup', {
      type: Sequelize.INTEGER,
      alowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('subscriptions');
  },
};
