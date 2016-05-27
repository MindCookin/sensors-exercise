var DataParser = require('./dataparser');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Data Structure Parser', function() {

// csv original
  const mockfile1 = {
    originalname: 'sensor1-23051923.csv',
    buffer: new Buffer('id-senial,timestamp-lectura,valor-lectura\n\
    precipitation,1464036793498,33\n\
    humidity,1463982570613,94\n\
    pressure,1464040427559,89\n\
    precipitation,1463982162149,13\n\
    precipitation,1463980261487,77\n\
    temperature,1464002350575,64\n\
    precipitation,1464030760407,56\n\
    pressure,1463986422567,5\n\
    precipitation,1464035992469,99')
  };

  const mockArray = [mockfile1];
  var dataParser;

  beforeEach(function (){
    dataParser = new DataParser();
  });

  describe('Transform CSV string into object', function () {

    var results;

    it('should receive a file array and return a data object', function () {
      results = dataParser.transform(mockArray);

      expect(results).to.be.a('Array');
      expect(results[0]).to.be.a('object');
    });
  });

  describe('Handle duplicates', function () {

    beforeEach(function () {
      var results = dataParser.transform(mockArray);
    })

    it('should clean {results} from duplicated entries', function () {
    });

    it('should merge {results} with same date into a timestamp array', function () {
    });

    it('should replace {results} with same date when acquireDate is future', function () {
    });

    it('should not replace {results} with same date when acquireDate is past', function () {
    });
  })
});
