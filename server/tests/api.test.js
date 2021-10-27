const request = require('supertest');
const server = require('../server');
const express = require('express');
const { app, close } = server;
const mongoose = require('mongoose');
const urlModel = require('../routes/models/urlModel');

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
};

const urlRecord2 = {
  title: "aTitle2",
  tagName: "aTagName2",
  url: "https://google.com/",
  urlLocation: "aUrlLocation2",
  active: false,
  type: "aType2",
  pdfLocation: "./generated/aTitle2.pdf",
  pdfStored: false,
  urlTracked: false
}




async function addUrlRecordToDB(urlRecord) {
  const res = await request(app)
    .post('/api/example/add')
    .send(urlRecord);
  return res.body._id;
}



// beforeAll(done => {
//   done();
// });

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  urlModel.deleteMany({}, () => {
    console.log("Database is now empty");
    close();
    done();
  })

});


// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })
// })


// describe('PDF generation', () => {
//   it('Pdf sucesfully generated', () => {

//     expect(true).toBe(true)
//   })
// })


describe('GET url record end points', function () {

  beforeAll(async () => {
    await addUrlRecordToDB(urlRecord);
    await addUrlRecordToDB(urlRecord2);
  });

  afterAll((done) => {
    urlModel.deleteMany({}, () => {
      console.log("Database is now empty");
      done();
    });
  });


  it('should get list of url record when endpoint /api/exmaple/list requested', function (done) {
    request(app)
      .get('/api/example/list')
      .set('Accept', 'application/json')
      .expect((res) => {
        console.log(res.body);
        const urlData = JSON.parse(res.body);
        const dataUrlRecordOne = urlData[0];
        expect(dataUrlRecordOne).toHaveProperty('_id');
        expect(dataUrlRecordOne.title).toEqual(urlRecord.title);
        expect(dataUrlRecordOne.tagName).toEqual(urlRecord.tagName);
        expect(dataUrlRecordOne.url).toEqual(urlRecord.url);
        expect(dataUrlRecordOne.urlLocation).toEqual(urlRecord.urlLocation);
        expect(dataUrlRecordOne.active).toEqual(urlRecord.active);
        expect(dataUrlRecordOne.type).toEqual(urlRecord.type);
        expect(dataUrlRecordOne.pdfLocation).toEqual('./generated');
        expect(dataUrlRecordOne.pdfStored).toEqual(urlRecord.pdfStored);
        expect(dataUrlRecordOne.urlTracked).toEqual(urlRecord.urlTracked);

        const dataUrlRecordTwo = urlData[1];
        expect(dataUrlRecordTwo).toHaveProperty('_id');
        expect(dataUrlRecordTwo.title).toEqual(urlRecord2.title);
        expect(dataUrlRecordTwo.tagName).toEqual(urlRecord2.tagName);
        expect(dataUrlRecordTwo.url).toEqual(urlRecord2.url);
        expect(dataUrlRecordTwo.urlLocation).toEqual(urlRecord2.urlLocation);
        expect(dataUrlRecordTwo.active).toEqual(urlRecord2.active);
        expect(dataUrlRecordTwo.type).toEqual(urlRecord2.type);
        expect(dataUrlRecordTwo.pdfLocation).toEqual('./generated');
        expect(dataUrlRecordTwo.pdfStored).toEqual(urlRecord2.pdfStored);
        expect(dataUrlRecordTwo.urlTracked).toEqual(urlRecord2.urlTracked);

      })
      .expect(200, done);
  });

  it('should get one url record when endpoint /api/example/one/:number requested', function (done) {
    request(app)
      .get('/api/example/one/0')
      .set('Accept', 'application/json')
      .expect((res) => {
        console.log(res.body);
        const dataUrlRecord = JSON.parse(res.body);
        expect(dataUrlRecord).toHaveProperty('_id');
        expect(dataUrlRecord.title).toEqual(urlRecord.title);
        expect(dataUrlRecord.tagName).toEqual(urlRecord.tagName);
        expect(dataUrlRecord.url).toEqual(urlRecord.url);
        expect(dataUrlRecord.urlLocation).toEqual(urlRecord.urlLocation);
        expect(dataUrlRecord.active).toEqual(urlRecord.active);
        expect(dataUrlRecord.type).toEqual(urlRecord.type);
        expect(dataUrlRecord.pdfLocation).toEqual('./generated');
        expect(dataUrlRecord.pdfStored).toEqual(urlRecord.pdfStored);
        expect(dataUrlRecord.urlTracked).toEqual(urlRecord.urlTracked);
      })
      .expect(200, done);
  });
});

describe('POST delete url record endpoints', () => {

  beforeAll(async () => {
    await addUrlRecordToDB(urlRecord);
    await addUrlRecordToDB(urlRecord2);
  });

  afterAll((done) => {
    urlModel.deleteMany({}, () => {
      console.log("Database is now empty");
      done();
    });
  });

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function sleep(fn, ...args) {
    await timeout(1000);
    return fn(...args);
  }


  it('should delete one url record when endpoint /api/example/delete requested', async () => {
    await request(app)
      .delete('/api/example/delete')
      .send({ 'id': 0 })
      .expect((res) => {
        expect(res.statusCode).toEqual(200);
      });

    await sleep(getRequest);
    async function getRequest() {
      await request(app)
        .get('/api/example/one/0')
        .set('Accept', 'application/json')
        .expect((res) => {
          const dataUrlRecord = JSON.parse(res.body);
          expect(dataUrlRecord.title).toEqual(urlRecord2.title);
          expect(dataUrlRecord.tagName).toEqual(urlRecord2.tagName);
          expect(dataUrlRecord.url).toEqual(urlRecord2.url);
          expect(dataUrlRecord.urlLocation).toEqual(urlRecord2.urlLocation);
          expect(dataUrlRecord).toHaveProperty('active');
          expect(dataUrlRecord.type).toEqual(urlRecord2.type);
          expect(dataUrlRecord.pdfLocation).toEqual('./generated');
          expect(dataUrlRecord.pdfStored).toEqual(urlRecord2.pdfStored);
          expect(dataUrlRecord.urlTracked).toEqual(urlRecord2.urlTracked);
        });
    }
  });


});



describe('POST edit url record endpoints', () => {
  let id_1 = null;

  beforeAll(async () => {
    id_1 = await addUrlRecordToDB(urlRecord);
    await addUrlRecordToDB(urlRecord2);
  });

  afterAll((done) => {
    urlModel.deleteMany({}, () => {
      console.log("Database is now empty");
      done();
    });
  });

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function sleep(fn, ...args) {
    await timeout(1000);
    return fn(...args);
  }


  it('should edit one url record when endpoint /api/example/edit/:number requested', async () => {
    const modifiedUrlRecord = {
      title: "xTitle",
      tagName: "xTagName",
      url: "https://xtackoverflow.com/",
      urlLocation: "xUrlLocation",
      active: false,
      type: "xType",
      pdfLocation: "./xenerated/",
      pdfStored: false,
      urlTracked: false
    };


    await request(app)
      .post('/api/example/edit/' + id_1)
      .send(modifiedUrlRecord)
      .expect((res) => {
        expect(res.statusCode).toEqual(200);
      });

    await sleep(getRequest);
    async function getRequest() {
      await request(app)
        .get('/api/example/one/0')
        .set('Accept', 'application/json')
        .expect((res) => {
          const dataUrlRecord = JSON.parse(res.body);
          expect(dataUrlRecord).toHaveProperty('_id');
          expect(dataUrlRecord.title).toEqual(modifiedUrlRecord.title);
          expect(dataUrlRecord.tagName).toEqual(modifiedUrlRecord.tagName);
          expect(dataUrlRecord.url).toEqual(modifiedUrlRecord.url);
          expect(dataUrlRecord.urlLocation).toEqual(modifiedUrlRecord.urlLocation);
          expect(dataUrlRecord).toHaveProperty('active');
          expect(dataUrlRecord.type).toEqual(modifiedUrlRecord.type);
          expect(dataUrlRecord).toHaveProperty('pdfLocation');
          expect(dataUrlRecord.pdfStored).toEqual(modifiedUrlRecord.pdfStored);
          expect(dataUrlRecord.urlTracked).toEqual(modifiedUrlRecord.urlTracked);
        });
    }



  });
});


describe('POST add url record endpoints', () => {
  afterAll((done) => {
    urlModel.deleteMany({}, () => {
      console.log("Database is now empty");
      done();
    });
  });

  it('should post one url record when endpoint /api/example/add requested', async () => {
    const res = await request(app)
      .post('/api/example/add')
      .send(urlRecord);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual(urlRecord.title);
    expect(res.body.tagName).toEqual(urlRecord.tagName);
    expect(res.body.url).toEqual(urlRecord.url);
    expect(res.body.urlLocation).toEqual(urlRecord.urlLocation);
    expect(res.body).toHaveProperty('active');
    expect(res.body.type).toEqual(urlRecord.type);
    expect(res.body.pdfLocation).toEqual('./generated');
    expect(res.body.pdfStored).toEqual(urlRecord.pdfStored);
    expect(res.body.urlTracked).toEqual(urlRecord.urlTracked);
  });
});