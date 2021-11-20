import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import pricingModelRoute from './routes/pricingModel.routes';
import priceConfigurationRoute from './routes/priceConfiguration.routes';
import machineRoute from './routes/machine.routes';

const app = new Koa();
const PORT = process.env.PORT || 1337;
const router = new Router();

app.use(bodyParser());
// route /pricing-models
app.use(pricingModelRoute.routes());
// route /pricing-models/:pm-id
app.use(priceConfigurationRoute.routes());
// route  /machines
app.use(machineRoute.routes());

app.use(router.routes());
const server = app.listen(PORT, () =>
	console.log(`Server listening on port ${PORT}`)
);

module.exports = server;
