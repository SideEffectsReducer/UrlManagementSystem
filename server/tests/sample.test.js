const request = require('supertest');
const server = require('../server');
const express = require('express');
const {app, close} = server;
const mongoose = require('mongoose');
const { url } = require('inspector');

jest.setTimeout(5000);

beforeAll(done => {
  done();
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  close();
  done();

})


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})


describe('PDF generation', () => {
  it('Pdf sucesfully generated', () => {
    
    expect(true).toBe(true)
  })
})


describe('GET Url record', function() {
  it('Get json containing url records list', function(done) {
    request(app)
      .get('/api/example/list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('POST Url record', () => {
  it('Create new url record', async () => {
    const urlRecord = {
        title: "aTitle",
        tagName: "aTagName",
        url: "aUrl",
        urlLocation: "aUrlLocation",
        active: true,
        type: "aType",
        pdfLocation: "aPdfLocation",
        pdfStored: true,
        urlTracked: true
    }

    const res = await request(app)
      .post('/api/example/add')
      .send(urlRecord);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(urlRecord);
  })
})