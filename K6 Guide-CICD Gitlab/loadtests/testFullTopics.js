import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  discardResponseBodies: true,
  thresholds: {
    http_req_duration: [
      {
        threshold: "p(95)<500",
      },
    ],
    checks: [
      {
        threshold: "rate>0.9",
      },
    ],
  },
  ext: {
    loadimpact: {
      name: "Hello k6 cloud!",
      staticIPs: false,
      distribution: {
        distributionLabel1: { loadZone: "amazon:jp:tokyo", percent: 100 }, //https://k6.io/docs/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#list-of-supported-load-zones
      },
      note: "Anything that may be worth noting about your test.",
    },
  },
  scenarios: {
    Scenario_GetCrocodiles: {
      exec: "FunctionForThisScenario",
      executor: "ramping-vus",
      startTime: "0s",
      startVUs: 1,
      stages: [
        { duration: "10s", target: 5 },
        { duration: "5s", target: 20 },
        { duration: "1m", target: 30 },
        { duration: "1m", target: 10 },
      ],
    },
    Scenario_GetContacts: {
      exec: "FunctionGetContacts",
      executor: "ramping-vus",
      startTime: "30s",
      startVUs: 5,
      stages: [{ duration: "1m", target: 5 }],
    },
  },
};

export function FunctionForThisScenario() {
  let result = http.get("https://test-api.k6.io/public/crocodiles/");
  check(result, {
    "Status is 200": (r) => r.status == 200,
    "Duration < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(3);
}

export function FunctionGetContacts() {
  let result = http.get("https://test.k6.io/contacts.php");
  check(result, {
    "Status is 200": (r) => r.status == 200,
    "Duration < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(3);
}
