import http from "k6/http";
import { sleep, check } from 'k6';

export default function () {
  const url = "https://rickandmortyapi.com/api/character";

  let result = http.get(url);

  var personajes = JSON.parse(result.body)

  console.log(personajes.results[0])

  check(result, {
    "Status is 200": (r) => r.status == 200,
    "Duration < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
