module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('subscriptions', 'data_meetup');
  },

  down: queryInterface => {
    return queryInterface.addColumn('subscriptions', 'data_meetup');
  },
};
