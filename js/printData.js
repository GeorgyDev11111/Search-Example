export default function (data) {
  for(const obj of data) {
    let str = ""
    for(let item in obj) {
      str += obj[item] + " "
    }
    const elem = document.createElement("div")
    elem.textContent = str
    document.querySelector("#root").append(elem)
  }
}