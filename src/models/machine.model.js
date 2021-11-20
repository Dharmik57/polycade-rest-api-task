export default (sequelize, Sequelize) => {
	const Machine = sequelize.define('machine', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		pm_id: {
			type: Sequelize.STRING // GUID
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		tableName: 'machine'
	});

	return Machine;
};
