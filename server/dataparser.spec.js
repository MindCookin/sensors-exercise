var DataParser = require('./dataparser');

describe('Data Structure Parser', function() {

// csv original
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
/*
1. STEP 1 (parse)
{ sensor: @string, date: @dateString, timestamps: [@int, ...], temperature: [@int, ...], precipitation: [@int, ...], pressure: [@int, ...], humidity: [@int, ...], acquireDate: @string || @dateString}

  A) Leer línea a línea:
   * crear objeto {AUXILIAR}
   * revisar si ya existe un objeto en la lista de métricas con el mismo {name} y {date} que {AUXILIAR}
     * si existe, comprobar si tiene el mismo {timestamp}
        * si tiene el mismo {timestamp} comprobar si tiene mayor {acquireDate}
          * si tiene mayor {acquireDate} continuar
          * si tiene menor {acquireDate} pasar a siguiente línea
    B) Rellenar objeto con los valores de {AUXILIAR}:
    {sensor, date, acquireDate, PUSH.Timestamps, PUSH.temperature, PUSH.humidity, PUSH.precipitation, PUSH.pressure}

2. UNA VEZ RELLENO EL ARRAY DE MÉTRICAS:

  STEP 2 (medias)
  { sensor: @string, date: @dateString, timestamps: [@int, ...], temperature: MEDIA, precipitation: SUM, pressure: MEDIA, humidity: MEDIA, acquireDate: @string || @dateString}

  STEP 3 [SALIDA] (quitar timestamps)
  { sensor: @string, date: @dateString, temperature: MEDIA, precipitation: SUM, pressure: MEDIA, humidity: MEDIA, acquireDate: @string || @dateString}

3. ENVIAR
*/
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
