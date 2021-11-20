import Sequelize from 'sequelize';
import sequelize from '../config/sequalize.config';
import PricingModel from './pricingModel.model';
import PriceConfiguration from './priceConfiguration.model';
import Machine from './machine.model';

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pricingModel = PricingModel(sequelize, Sequelize);
db.priceConfiguration = PriceConfiguration(sequelize, Sequelize);
db.machine = Machine(sequelize, Sequelize);

db.pricingModel.hasMany(db.priceConfiguration, { as: 'pricing', foreignKey: 'pm_id' });
// db.pricingModel.hasOne(db.machine, { foreignKey: 'pm_id' });
db.machine.belongsTo(db.pricingModel, { foreignKey: 'pm_id' });

export default db;
