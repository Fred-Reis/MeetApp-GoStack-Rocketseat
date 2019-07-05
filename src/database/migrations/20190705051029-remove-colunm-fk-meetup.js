module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('meetup', 'org_id');
  },
  down: queryInterface => {
    return queryInterface.addColumn('meetup', 'org_id');
  },
};
