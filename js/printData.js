import $,{ $new } from "./jGosha.js"

export default function (data) {
  for(const obj of data) {
    let str = ""
    for(let item in obj) {
      str += obj[item] + " "
    }
    const elem = $new("div")
    elem.textContent = str
    $("#root").append(elem)
  }
}
