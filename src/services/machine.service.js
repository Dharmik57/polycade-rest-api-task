import db from '../models';
import pricingDefaultData from '../mocks/prices.json';
const MachineConfigurationData = db.machine;

// return the pricing model and price configurations set for a given machine
// if the machine does not have a pricing model configured then the default model from prices.json is returned
// if the machine isn't found by machine-id it responds with not found
export const findPricingModelConfigurationFromMachine = async (ctx) => {
	try {
		let machineData = await MachineConfigurationData.findOne({
			include: [
				{
					model: db.pricingModel,
					attributes: ['name'],
					include: [
						{
							model: db.priceConfiguration,
							attributes: ['price', 'name', 'value'],
							as: 'pricing'
						}
					]
				}
			],
			attributes: ['name'],
			where: {
				id: ctx.params.machine_id
			}
		});

		if (machineData) {
			let newData = machineData;
			console.log(pricingDefaultData);
			console.log(newData.pricing_model);
			if(!newData.pricing_model)
			{
				newData.pricing_model = {...pricingDefaultData};
			}

			console.log(newData);
			ctx.status = 200;
			ctx.body = {
				status: 'success',
				data: newData,
				message: 'successfully'
			};
		} else {
			ctx.status = 200;
			ctx.body = {
				status: 'Not found',
				message: 'Not found'
			};
		}
	} catch (err) {
		console.log(err);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: err.message || 'Sorry, an error has occurred.'
		};
	}
};

// sets the pricing model for an individual machine to the one from pm-id
// if the machine already has a pricing model, it is replaced by this one
// if the machine isn't found by machine-id it responds with not found
// if the pricing model isn't found by pm-id it responds with not found
export const updateMachineWithPricingModel = async (ctx) => {
	try {
		const machineData = await MachineConfigurationData.update(
			{
				pm_id: ctx.params.pm_id
			},
			{
				where: {
					id: ctx.params.machine_id
				}
			}
		);

		ctx.status = 200;
		ctx.body = {
			status: 'success',
			data: machineData,
			message: 'successfully'
		};
	} catch (err) {
		console.log(err);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: err.message || 'Sorry, an error has occurred.'
		};
	}
};

// removes the pricing model from the machine (unsets it)
export const deletePricingModelFromMachine = async (ctx) => {
	try {
		const machineData = await MachineConfigurationData.update({
			pm_id: null
		},
		{
			where: {
				id: ctx.params.machine_id,
				pm_id: ctx.params.pm_id
			}
		});

		if (machineData > 0) {
			ctx.status = 200;
			ctx.body = {
				status: 'success',
				data: machineData,
				message: 'Deleted successfully'
			};
		} else {
			ctx.status = 200;
			ctx.body = {
				status: 'Not found',
				data: machineData,
				message: 'Not found'
			};
		}

	} catch (err) {
		console.log(err);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: err.message || 'Sorry, an error has occurred.'
		};
	}
};
