import { v4 as uuidv4 } from 'uuid';
import db from '../models';
import pricingDefaultData from '../mocks/prices.json';
const PricingConfigurationModel = db.priceConfiguration;

// creates a new pricing model in the system
// returns the ID of the new pricing model to the caller
export const createPriceForPricingModel = async (ctx) => {
	try {
		// save pricing model to database
		const requestBody = {
			name: (ctx.request?.body && ctx.request?.body?.name) || '',
			pm_id: ctx.params?.id,
			price: (ctx?.request?.body && ctx.request?.body?.price) || 0,
			value: (ctx?.request?.body && ctx.request?.body?.value) || 0
		};
		const res = await PricingConfigurationModel.create(requestBody);
		ctx.status = 200;
		ctx.body = {
			status: 'success',
			data: res,
			message: 'successfully added'
		};
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: error.message || 'Sorry, an error has occurred.'
		};
	}
};

// get an individual pricing model
// include the price configurations for the pricing model
// if the pricing model isn't found by pm-id it responds with not found
export const getByPriceConfigFromPMID = async (ctx) => {
	try {
		const pricingConfigData = await PricingConfigurationModel.findOne({
			attributes: ['price', 'name', 'value'],
			where: {
				pm_id: ctx.params.id
			}
		});

		ctx.status = 200;
		ctx.body = {
			status: 'success',
			data: pricingConfigData,
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

// removes a price configuration from a pricing model
export const deletePriceFromPricingModel = async (ctx) => {
	try {
		const pricingConfigureData = await PricingConfigurationModel.destroy({
			where: { id: ctx.params.price_id, pm_id: ctx.params.pm_id }
		});

		if (pricingConfigureData > 0) {
			ctx.status = 200;
			ctx.body = {
				status: 'success',
				data: pricingConfigureData,
				message: 'Deleted successfully'
			};
		} else {
			ctx.status = 200;
			ctx.body = {
				status: 'Not Found',
				message: 'Data Not Found'
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
