export default (sequelize, Sequelize) => {
	const PricingModel = sequelize.define('pricing_model', {
		id: {
			type: Sequelize.STRING, // GUID
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: 'pricing_model'
	});

	return PricingModel;
};
