import http from "k6/http";
import { sleep, check } from "k6";

// https://k6.io/docs/using-k6/k6-options/reference/#stages

export let options = {
  thresholds: {
    http_req_duration: [
      {
        threshold: "p(95)<200",
      },
    ],
    checks: [
      {
        threshold: "rate>0.9",
      },
    ],
  },
  stages: [
    { duration: "1m", target: 5 },
    { duration: "2m", target: 20 },
    { duration: "3m", target: 30 },
    { duration: "1m", target: 10 },
  ],
};

export default function () {
  let result = http.get("http://test.k6.io");

  check(result, {
    "Status is 200": (r) => r.status == 200,
    "Duration < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
