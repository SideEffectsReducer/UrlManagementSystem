const request = require('supertest');
const server = require('../server');
const express = require('express');
const {app, close} = server;
const mongoose = require('mongoose');

jest.setTimeout(5000);

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  close()
  done()

})


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/api/example/list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/example/add')
      .send({
        title: "aTitle",
        tagName: "aTagName",
        url: "aUrl",
        urlLocation: "aUrlLocation",
        active: true,
        type: "aType",
        pdfLocation: "aPdfLocation",
        pdfStored: true,
        urlTracked: true
      })
    expect(res.statusCode).toEqual(201)
  })
})