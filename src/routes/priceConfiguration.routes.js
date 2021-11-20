import Router from 'koa-router';
import {getByPriceConfigFromPMID, createPriceForPricingModel, deletePriceFromPricingModel } from '../services/pricingConfiguration.service';
const pricingConfigurationRoute = new Router();

//  GET /pricing-models/:pm-id/prices
pricingConfigurationRoute.get('/pricing-models/:id/prices', async (ctx, next) => {
	return getByPriceConfigFromPMID(ctx);
});

// POST /pricing-models/:pm-id/prices
pricingConfigurationRoute.post('/pricing-models/:id/prices', async (ctx, next) => {
	return createPriceForPricingModel(ctx);
});

// DELETE /pricing-models/:pm-id/prices/:price-id
pricingConfigurationRoute.delete('/pricing-models/:pm_id/prices/:price_id', async (ctx, next) => {
	return deletePriceFromPricingModel(ctx);
});


export default pricingConfigurationRoute;
