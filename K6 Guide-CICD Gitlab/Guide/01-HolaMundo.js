import http from 'k6/http';
import { sleep } from 'k6';

/* export const options = {
  vus: 10,
  duration: '30s',
}; */

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

//k6 run Guide/01-HolaMundo.js
//k6 run --vus 10 --duration 30s Guide/01-HolaMundo.js

//Funcion de Entrada
// k6 run --out cloud script.js
// k6 login cloud --token 4252162302a5e26830491e6c9f6dab79f7032b77287fc8edf74b8785036c0678


