module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('meetup', 'banner_id', {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        alowNull: false,
      }),

      queryInterface.addColumn('meetup', 'org_id', {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        alowNull: false,
      }),
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('user', 'avatar_id');
  },
};
