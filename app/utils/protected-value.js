import Ember from "ember";

export default function protectedValue(config) {
  const {set, value} = config;
  return true;
}
