import "./global.js"
import $ from "./jGosha.js"
import getData from "./getData.js"
import printData from "./printData.js"


// асинхронщина
(async function () {
  const data = await getData("./data.json")
  localData = data
  // добавление даты на страницу
  printData(localData)
})()


// поиск
$("#search").addEventListener("input", handlerInput )

// обработчик
function handlerInput() {
  // перед каждым запуском отчищаем поле для рендера
  document.querySelector("#root").innerHTML = ""
  // значение в поле input
  const searchLine = $("#search").value

  // логика фильтрации  
  // вшиваем в каждый объект итератор
  const convert = localData.map(el => {
    el[Symbol.iterator] = function* () {
      for(let i in this) {
        yield this[i]
      }
    }
    return el
  })
  // теперь объект можно итерировать, это позволяет слепить все значения любых ключей в одну строку для поиска
  // не важно какой json прилетит, любые ключи будут найдены ( можно конечно по другому сделать, но я захотел так )
  let data = convert.filter(el => [...el].join(" ").toLowerCase().trim().includes(searchLine.toLowerCase().trim()))

  // обновляем стейт
  if(!data.length) {
    printData(localData)
    // ui - если не находи то, бортер красный :)
    $("#search").style = "border: 2px solid red"
  }else {
    $("#search").style = ""
    printData(data)
  }
}
