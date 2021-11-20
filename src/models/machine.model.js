export default (sequelize, Sequelize) => {
	const Machine = sequelize.define('machine', {
		id: {
			type: Sequelize.STRING, // GUID
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		pricing_id: {
			type: Sequelize.STRING // GUID
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: 'machine'
	});

	return Machine;
};
