var DataParser = require('./dataparser');

describe('Data Structure Parser', function() {

  const mockfile1 = {
    originalname: 'sensor1-23052016.csv',
    buffer: new Buffer('id-senial,timestamp-lectura,valor-lectura\
    precipitation,1464036793498,33\
    humidity,1463982570613,94\
    pressure,1464040427559,89\
    precipitation,1463982162149,13\
    precipitation,1463980261487,77\
    temperature,1464002350575,64\
    precipitation,1464030760407,56\
    pressure,1463986422567,5\
    precipitation,1464035992469,99')
  };

  describe('#processFile', function () {
    it('should accept an array of files and return a single query object', function () {

    });

    it('should fill the "origin" object with parsed data', function () {

    });
  });

  describe('#processLine', function () {
    it('should accept a string containing a csv line and inject it into the target object', function () {

    });

    it('should NOT update the target when sensor and timestamp are the same but the acquire date is lower', function () {

    });

    it('SHOULD update the target when sensor and timestamp are the same and the acquire date is higher', function () {

    });
  });
});
