import chai from 'chai';
const should = chai.should();
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import server from '../index';

describe('routes', () => {
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
