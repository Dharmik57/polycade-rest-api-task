import { v4 as uuidv4 } from "uuid";
import db from "../models";
import pricingDefaultData from "../mocks/prices.json";
const PricingModel = db.pricingModel;

// returns all of the pricing models available for the system also returns the default pricing model in prices.json
export const findAllPricing = async (ctx) => {
	try {
		const pricingData = await PricingModel.findAll({
			include: [
				{
					model: db.priceConfiguration,
					attributes: ["price", "name", "value"],
					as: "pricing",
				},
			],
		});

		var result = pricingData.reduce(function (map, obj) {
			map[obj.id] = obj;
			return map;
		}, {});

		const responseObj = {
			...pricingDefaultData,
			...result,
		};

		ctx.status = 200;
		ctx.body = {
			status: "success",
			data: responseObj,
			message: "Pricing data is getting successfully",
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

// creates a new pricing model in the system
// returns the ID of the new pricing model to the caller
export const createPricing = async (ctx) => {
	try {
		// save pricing model to database
		const request = {
			name: (ctx.request.body && ctx.request.body.name) || "",
			id: uuidv4(),
		};
		const res = await PricingModel.create(request);
		ctx.status = 200;
		ctx.body = {
			status: "success",
			data: {
				id: res.id,
			},
			message: "Pricing data created successfully.",
		};
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: error.message || "Sorry, an error has occurred.",
		};
	}
};

// get an individual pricing model
// include the price configurations for the pricing model
// if the pricing model isn't found by pm-id it responds with not found
export const getByPricingModelID = async (ctx) => {
	try {
		const pricingData = await PricingModel.findOne({
			include: [
				{
					model: db.priceConfiguration,
					attributes: ["price", "name", "value"],
					as: "pricing",
				},
			],
			where: {
				id: ctx.params.id,
			},
		});

		if(pricingData)
		{
			ctx.status = 200;
			ctx.body = {
				status: "success",
				data: pricingData,
				message: "Pricing data is getting successfully",
			};
		}
		else {
			ctx.status = 200;
			ctx.body = {
				status: "Not Found",
				message: "Data Not Found",
			};
		}
	} catch (err) {
		console.log(err);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: err.message || "Sorry, an error has occurred.",
		};
	}
};

// updates an existing pricing model meta-data
// does not affect the pricing configurations for the pricing model
export const updatePricing = async (ctx) => {
	try {
		const pricingData = await PricingModel.update(
			{
				name: ctx.request.body.name,
			},
			{
				where: {
					id: ctx.params.id,
				},
			}
		);

		ctx.status = 200;
		ctx.body = {
			status: "success",
			data: pricingData,
			message: "Pricing data is updated successfully.",
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

// removes a price configuration from a pricing model
export const deletePricing = async (ctx) => {
	try {
		const pricingData = PricingModel.destroy({
			where: { id: ctx.params.id }
		});
		ctx.status = 200;
		ctx.body = {
			status: "success",
			data: pricingData,
			message: "Deleted successfully",
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
