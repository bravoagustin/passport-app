import {webkit} from "playwright"

const browser = await webkit.launch({
    headless: false
})

const page = await browser.newPage()

await page.goto("https://www.cgeonline.com.ar/informacion/apertura-de-citas.html")

const table = page.locator("table")
const pasaporteRow = table.getByText("renovación y primera vez").locator("..").locator("..").locator("td:nth-child(3)")
//30/01/2025 a las 09:00

const nextDate = await pasaporteRow.innerText();

const [date, time] = nextDate.split(" a las ")

console.log(`La proxima apertura de fechas para pasaportes es el ${date} - ${time}hs`)

browser.close()