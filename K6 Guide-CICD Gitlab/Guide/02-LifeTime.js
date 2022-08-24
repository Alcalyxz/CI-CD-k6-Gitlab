// Init code
import http from 'k6/http';
import { sleep } from 'k6';

export function setup() {
  // 1. setup code
  //Preparar los Test Ej TOKEN o la data que seria entrada para el VU code
  console.log('1. Setup Code')
}

export default function (data) {
  // 2. VU code
  http.get('http://test.k6.io');
  sleep(1);
  console.log('2. VU Code')
}

export function teardown(data) {
  // 3. teardown code
  console.log('3. Teardown Code')
  //Desmontar Datos, estructuras 
}
