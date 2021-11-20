export default (sequelize, Sequelize) => {
	const PriceConfiguration = sequelize.define('price_configuration', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		pm_id: {
			type: Sequelize.STRING
		},
		price: {
			type: Sequelize.NUMBER
		},
		name: {
			type: Sequelize.STRING
		},
		value: {
			type: Sequelize.NUMBER
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: 'price_configuration'
	});

	return PriceConfiguration;
};
