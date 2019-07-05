import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        description: Sequelize.STRING,
        local: Sequelize.STRING,
        data: Sequelize.DATE,
        banner_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'org_id', as: 'org' });
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
  }
}

export default Meetup;
