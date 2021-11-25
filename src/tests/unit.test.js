import chai from 'chai';
const should = chai.should();
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import server from '../index';

describe('Machine - ', () => {
	describe('PUT /machines/:machine-id/prices/:pm-id', () => {
		it('sets the pricing model for an individual machine to the one from pm-id', (done) => {
			chai.request(server)
				.put('/machines/5632e1ec-46cb-4895-bc8b-a91644568cd5/prices/9d91521d-a2df-4fac-8d21-8271b373ab47')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.message.should.eql('Machine data is updated successfully.');
					done();
				});
		});

		it('if the machine already has a pricing model, it is replaced by this one', (done) => {
			chai.request(server)
				.put('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices/9d91521d-a2df-4fac-8d21-8271b373ab47')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.message.should.eql('Machine data is updated successfully.');
					done();
				});
		});

		it("if the machine isn't found by machine-id it responds with not found", (done) => {
			chai.request(server)
				//  added a wrong machine id
				.put('/machines/57342663-909c-4adf-9829-6dd1a3aa91434/prices/9d91521d-a2df-4fac-8d21-8271b373ab47')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.equal('Not found');
					res.body.message.should.eql('Not found');
					done();
				});
		});

		it("if the pricing model isn't found by pm-id it responds with not found", (done) => {
			chai.request(server)
				// added wrong pm:id
				.put('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices/9d91521d-a2df-4fac-8d21-8271b373ab47eew')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.equal('Not found');
					res.body.message.should.eql('Not found');
					done();
				});
		});
	});

	describe('DELETE /machines/:machine-id/prices/:pm-id', () => {
		it('removes the pricing model from the machine (unsets it)', (done) => {
			chai.request(server)
				.delete('/machines/4111947a-6c58-4977-90fa-2caaaef88648/prices/9d91521d-a2df-4fac-8d21-8271b373ab47')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('success');
					res.body.message.should.eql('Pricing model removed successfully');
					done();
				});
		});
	});

	describe('GET /machines/:machine-id/prices', () => {
		it('return the pricing model and price configurations set for a given machine', (done) => {
			chai.request(server)
				.get('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('success');
					res.body.message.should.eql('Pricing data is getting successfully');
					done();
				});
		});

        it('if the machine does not have a pricing model configured then the default model from prices.json is returned', (done) => {
			chai.request(server)
				.get('/machines/f5ff97ce-8db4-4fde-84ef-0c33c8eb30a2/prices')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('success');
					res.body.message.should.eql('Pricing data is getting successfully');
					done();
				});
		});

		it("if the machine isn't found by machine-id it responds with not found", (done) => {
			chai.request(server)
				// added wrong machine id
				.get('/machines/680ca31b-b3a3-4aa1-8678-178c130b455721/prices')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('Not found');
					res.body.message.should.eql('Not found');
					done();
				});
		});
	});
});

describe('Pricing Configuration - ', () => {
	describe('GET /pricing-models/:pm-id/prices', () => {
		it('returns the prices configured for a specific pricing model', (done) => {
			chai.request(server)
				.get('/pricing-models/9d91521d-a2df-4fac-8d21-8271b373ab47/prices')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('success');
					res.body.message.should.eql('Pricing configuration is getting successfully');
					done();
				});
		});
	});

	describe('POST /pricing-models/:pm-id/prices', () => {
		it('adds a new price configuration for a pricing model', (done) => {
			chai.request(server)
				.post('/pricing-models/9d91521d-a2df-4fac-8d21-8271b373ab47/prices')
				.send({
					name: 'Price Configuration add Unit test',
					price: 10,
					value: 60
				})
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.message.should.eql('Pricing configuration added successfully.');
					// res.body.data.should.include.keys('id');
					done();
				});
		});
	});

	describe('Delete /pricing-models/:pm-id/prices/:price-id', () => {

		it('add new price configuration and removes a price configuration from a pricing model', (done) => {
			chai.request(server)
				.post('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices')
				.send({
					name: 'Add new price Configuration and delete it',
					price: 15,
					value: 46
				})
				.end((err, res) => {
					chai.request(server)
						.delete(`/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices/${res.body?.data?.id}`)
						.end((err, res) => {
							should.not.exist(err);
							res.status.should.eql(200);
							res.type.should.eql('application/json');
							res.body.status.should.equal('success');
							res.body.message.should.eql('Pricing configuration removed successfully');
							done();
						});
				});
		});

		it("if the pricing model isn't found by pm-id it responds with not found", (done) => {
			chai.request(server)
			// passing wrong pricing id
				.delete('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e/prices/3')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('Not Found');
					res.body.message.should.eql('Data Not Found');
					done();
				});
		});

		it("if the price configuration isn't found by price-id it responds with not found", (done) => {
			chai.request(server)
			// passing wrong pm-id
				.delete('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e21/prices/9')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('Not Found');
					res.body.message.should.eql('Data Not Found');
					done();
				});
		});
	});
});

describe('Pricing-Model - ', () => {
	describe('GET /pricing-models', () => {
		it('should return json', (done) => {
			chai.request(server)
				.get('/pricing-models')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('success');
					res.body.message.should.eql('Pricing data is getting successfully');
					done();
				});
		});
	});

	describe('POST /pricing-models', () => {
		it('should return the pricing-models id', (done) => {
			chai.request(server)
				.post('/pricing-models')
				.send({
					name: 'Pricing unit testing'
				})
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.message.should.eql('Pricing data created successfully.');
					res.body.data.should.include.keys('id');
					done();
				});
		});
	});

	describe('GET By pm_id /pricing-models/:pm_id', () => {
		it('should return json', (done) => {
			chai.request(server)
				.get('/pricing-models/54a94c65-feb4-45e7-b2b1-3dbfe1196c1f')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('success');
					res.body.message.should.eql('Pricing data is getting successfully');
					done();
				});
		});

		it('should return not found pm_id', (done) => {
			chai.request(server)
				.get('/pricing-models/54a94c65-feb4-45e7-b2b1-3dbfe1196c04')
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.eql(200);
					res.type.should.eql('application/json');
					res.body.status.should.equal('Not Found');
					res.body.message.should.eql('Data Not Found');
					done();
				});
		});
	});

	describe('PUT /pricing-models', () => {
		it('should return the updated status', (done) => {
			chai.request(server)
				.put('/pricing-models/54a94c65-feb4-45e7-b2b1-3dbfe1196c1f')
				.send({
					name: 'Pricing unit testing updated'
				})
				.end((err, res) => {
					should.not.exist(err);
					res.status.should.equal(200);
					res.type.should.equal('application/json');
					res.body.status.should.eql('success');
					res.body.message.should.eql('Pricing data is updated successfully.');
					done();
				});
		});
	});
});
