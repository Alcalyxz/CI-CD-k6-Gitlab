import { sleep } from "k6";
import holaMundo from "../Guide/01-HolaMundo.js";
import lifeTime from "../Guide/02-LifeTime.js";

export default function () {
  holaMundo();
  lifeTime();
  sleep(2);
}
