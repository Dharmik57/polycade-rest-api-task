import Router from 'koa-router';
import {findPricingModelConfigurationFromMachine, deletePricingModelFromMachine, updateMachineWithPricingModel} from '../services/machine.service';
const pricingConfigurationRoute = new Router();

//  PUT /machines/:machine-id/prices/:pm-id
pricingConfigurationRoute.put('/machines/:machine_id/prices/:pm_id', async (ctx, next) => {
	return updateMachineWithPricingModel(ctx);
});

// DELETE /machines/:machine-id/prices/:pm-id
pricingConfigurationRoute.delete('/machines/:machine_id/prices/:pm_id', async (ctx, next) => {
	return deletePricingModelFromMachine(ctx);
});

// GET /machines/:machine-id/prices
pricingConfigurationRoute.get('/machines/:machine_id/prices', async (ctx, next) => {
	return findPricingModelConfigurationFromMachine(ctx);
});



export default pricingConfigurationRoute;
