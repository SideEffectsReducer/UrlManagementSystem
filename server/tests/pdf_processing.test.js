const fs = require('fs');
const fsExtra = require('fs-extra');

const {createPdf} = require('../pdf_processing');

beforeAll(done => {
    fsExtra.emptyDirSync("./generated");
    done();
});

afterAll(done => {
  done();
});


describe('Pdf processing positive', () => {

  it('Should generate pdf sucessfully', () => {
    const url = "https://stackoverflow.com/";
    const pdfName = "succesfully_generated";
    const path= "./generated";
    const relativePath = path + "/" + pdfName + ".pdf";
    createPdf(url, pdfName, path).then(() =>{
    expect(fs.existsSync(relativePath)).toEqual(true);
    });
  });
});

