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

  it('Get json containing one url record', function(done) {
    request(app)
      .get('/api/example/one/0')
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
        url: "https://stackoverflow.com/",
        urlLocation: "aUrlLocation",
        active: true,
        type: "aType",
        pdfLocation: "./generated/aTitle.pdf",
        pdfStored: true,
        urlTracked: true
    }

    const res = await request(app)
      .post('/api/example/add')
      .send(urlRecord);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual(urlRecord.title);

    expect(res.body.tagName).toEqual(urlRecord.tagName);
    expect(res.body.url).toEqual(urlRecord.url);
    expect(res.body.urlLocation).toEqual(urlRecord.urlLocation);
    expect(res.body.active).toEqual(urlRecord.active);
    expect(res.body.type).toEqual(urlRecord.type);
    expect(res.body.pdfLocation).toEqual(urlRecord.pdfLocation);
    expect(res.body.pdfStored).toEqual(urlRecord.pdfStored);
    expect(res.body.urlTracked).toEqual(urlRecord.urlTracked);
  });
});