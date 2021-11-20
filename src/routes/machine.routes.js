import Router from 'koa-router';
import {findPricingModelConfigurationFromMachine, deletePricingModelFromMachine, createNewMachine, updateMachineWithPricingModel, findAllMachine} from '../services/machine.service';
const machineRoute = new Router();

//  Get Machine Model
machineRoute.get('/machines', async (ctx, next) => {
	return findAllMachine(ctx);
});

// POST  Create new machine
machineRoute.post('/machines', async (ctx, next) => {
	return createNewMachine(ctx);
});


//  PUT /machines/:machine-id/prices/:pm-id
machineRoute.put('/machines/:machine_id/prices/:pm_id', async (ctx, next) => {
	return updateMachineWithPricingModel(ctx);
});

// DELETE /machines/:machine-id/prices/:pm-id
machineRoute.delete('/machines/:machine_id/prices/:pm_id', async (ctx, next) => {
	return deletePricingModelFromMachine(ctx);
});

// GET /machines/:machine-id/prices
machineRoute.get('/machines/:machine_id/prices', async (ctx, next) => {
	return findPricingModelConfigurationFromMachine(ctx);
});



export default machineRoute;
