import xlsx from "xlsx"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const dir = resolve(__dirname, "../", "uploads")

function setsDate(date) {
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()
  const second = new Date().getSeconds()

  const data = date.match(/([0-9]*)\/([0-9]*)\/([0-9]*)/, '$2/0$1/$3')
  let day = data[1]
  let month = data[2]
  let year = data[3]

  if (month.length === 1) month = `0${month}`
  if (day.length === 1) day = `0${day}`

  const correctData = `${day}/${month}/${year}`.replace(
    /(\d{2})\/(\d{2})\/(\d{4})/,
    '$3-$2-$1'
  )

  return `${correctData}T${hour}:${minute}:${second}`
}

export async function CreateNotesUseCase(file_name, store) {
  const workbook = xlsx.readFile(`uploads/${file_name}`)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const notes = []
  let cont = 0

  for (const i in worksheet) {
    cont = parseInt(worksheet[i].match(/:\D(\d+)/)[1])
    break 
  }
  
  for (let i = 0; i <= cont; i++) {
    if (worksheet[`B${i}`]) {
      if (worksheet[`C${i}`].v !== "Número") {
        const access_key = worksheet[`B${i}`].v.toString()
        const cnpj = worksheet[`E${i}`].v.toString()
        const value = worksheet[`I${i}`].v.toString().replace(",", ".")
        const nf = worksheet[`C${i}`].v.toString()
        const issue = setsDate(worksheet[`G${i}`].w)
        const provider = worksheet[`D${i}`].v.toUpperCase()
        const hangtag = !worksheet[`S${i}`] ? '-' : worksheet[`S${i}`].v
        const year = setsDate(worksheet[`G${i}`].w).match(/\d{4}/)[0]
  
        notes.push({
          access_key,
          cnpj,
          value,
          nf,
          issue,
          provider,
          hangtag,
          store,
          year
        })
      }
    }
  }

  return notes
}