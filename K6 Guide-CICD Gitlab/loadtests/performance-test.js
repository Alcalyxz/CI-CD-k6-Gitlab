import { sleep } from "k6";
import http from "k6/http";

export const options = {
  duration: "1m",
  vus: 50,
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95 percent of response times must be below 500ms
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
};

export default function () {
  let result = http.get("http://test.k6.io/contacts.php");

  check(result, {
    "Status is 200": (r) => r.status == 200,
    "Duration < 500ms": (r) => r.timings.duration < 500,
  });
  sleep(3);
}
