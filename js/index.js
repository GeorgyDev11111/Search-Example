import $ from "./jGosha.js"
import getData from "./getData.js"
import printData from "./printData.js"

let localData = []

// асинхронщина
;(async function () {
  localData = await getData("./data.json")
  // добавление данных на страницу
  printData(localData)
})()


// поиск
$("#search").addEventListener("input",(e) => handlerInput(e) )

// обработчик
async function handlerInput(e) {
  const { value } = e.target
  // перед каждым запуском отчищаем поле для рендера
  $("#root").innerHTML = ""

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
  let searchResult = convert.filter((el) => ( 
    [...el]
    .join(" ")
      .toLowerCase()
        .trim()
    .includes(
      value
        .toLowerCase()
          .trim()
    )
  ))

  // обновляем стейт
  const updateResult = searchResult.length
    ? searchResult
    : localData
  printData(updateResult)
  // обновляем ui
  searchResult.length
    ? $("#search").style = ""
    : $("#search").style = "border: 2px solid red"
}
