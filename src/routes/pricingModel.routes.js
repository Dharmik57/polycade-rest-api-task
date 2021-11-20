import Router from 'koa-router';
import {findAllPricing, createPricing, getByPricingModelID, updatePricing} from '../services/pricingModel.service.js';
const pricingModelRoute = new Router();

//  Get Pricing Model
pricingModelRoute.get('/pricing-models', async (ctx, next) => {
	return findAllPricing(ctx);
});

// POST /pricing-models
pricingModelRoute.post('/pricing-models', async (ctx, next) => {
	return createPricing(ctx);
});

// GET by id /pricing-models
pricingModelRoute.get('/pricing-models/:id', async (ctx, next) => {
	return getByPricingModelID(ctx);
});

// Put by id /pricing-models
pricingModelRoute.put('/pricing-models/:id', async (ctx, next) => {
	return updatePricing(ctx);
});


export default pricingModelRoute;
