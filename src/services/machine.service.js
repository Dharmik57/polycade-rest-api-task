import db from '../models';
import { v4 as uuidv4 } from 'uuid';
import pricingDefaultData from '../mocks/prices.json';
const MachineConfigurationData = db.machine;


// returns all of the pricing models available for the system also returns the default pricing model in prices.json
export const findAllMachine = async (ctx) => {
	try {
		const machineData = await MachineConfigurationData.findAll();

		var finalMachineData = machineData.reduce(function (map, obj) {
			map[obj.id] = obj;
			return map;
		}, {});

		ctx.status = 200;
		ctx.body = {
			status: "success",
			data: finalMachineData,
			message: "Machine data is getting successfully",
		};
	} catch (err) {
		console.log(err);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: err.message || "Sorry, an error has occurred.",
		};
	}
};

// creates a new machine in the system
// returns the ID of the new machine model to the caller
export const createNewMachine = async (ctx) => {
	try {
		// save pricing model to database
		const request = {
			name: (ctx.request.body && ctx.request.body.name) || "",
			id: uuidv4()
		};
		const res = await MachineConfigurationData.create(request);
		ctx.status = 200;
		ctx.body = {
			status: "success",
			data: res,
			message: "Machine added successfully.",
		};
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: error.message || "Sorry, an error has occurred.",
		};
	}
};

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
				pricing_id: ctx.params.pm_id
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
			pricing_id: null
		},
		{
			where: {
				id: ctx.params.machine_id,
				pricing_id: ctx.params.pm_id
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
