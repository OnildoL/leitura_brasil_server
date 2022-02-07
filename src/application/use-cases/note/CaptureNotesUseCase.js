import xlsx from "xlsx"

import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { unLink } from "../../../main/utils/unlink.js"

function setsDate(date) {
  let hour = `${new Date().getHours()}`
  let minute = `${new Date().getMinutes()}`
  let second = `${new Date().getSeconds()}`

  const data = date.match(/([0-9]*)\/([0-9]*)\/([0-9]*)/, '$2/0$1/$3')
  let day = data[1]
  let month = data[2]
  let year = data[3]

  if (month.length === 1) month = `0${month}`
  if (day.length === 1) day = `0${day}`

  if (hour.length === 1) hour = `0${hour}`
  if (minute.length === 1) minute = `0${minute}`
  if (second.length === 1) second = `0${second}`

  const correctData = `${day}/${month}/${year}`.replace(
    /(\d{2})\/(\d{2})\/(\d{4})/,
    '$3-$2-$1'
  )

  return `${correctData}T${hour}:${minute}:${second}.000-03:00`
}

export async function CaptureNotesUseCase(file_name, store) {
  const file_format = file_name.match(/[a-z]+$/)[0]
  const file_correct = file_name.includes("NFe-")
  
  if (!file_correct) {
    unLink(file_name)
    throw new AppError("Arquivo inválido!", 405)
  }

  if (file_format !== "xlsx") {
    unLink(file_name)
    throw new AppError("Formato inválido!", 405)
  }

  const workbook = xlsx.readFile(`uploads/${file_name}`)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const notes = []
  let cont = 0

  for (const i in worksheet) {
    cont = parseInt(worksheet[i].match(/:\D(\d+)/)[1])
    break 
  }
  
  if (cont > 900) {
    unLink(file_name)
    throw new AppError("Limite máximo de linhas: 900", 405)
  }

  for (let i = 0; i <= cont; i++) {
    if (worksheet[`B${i}`]) {
      if (worksheet[`C${i}`].v !== "Número") {
        const access_key = worksheet[`B${i}`].v.toString()
        const cnpj = !worksheet[`E${i}`] ? "ISENTO" : worksheet[`E${i}`].v.toString()
        const value = worksheet[`I${i}`].v.toString().replace(",", ".")
        const nf = worksheet[`C${i}`].v.toString()
        const issue = setsDate(worksheet[`G${i}`].w)
        const provider = worksheet[`D${i}`].v.toUpperCase()
        const hangtag = !worksheet[`S${i}`] ? '-' : worksheet[`S${i}`].v
        const year = setsDate(worksheet[`G${i}`].w).match(/\d{4}/)[0]

        notes.push({ access_key, cnpj, value, nf, issue, provider, hangtag, store, year })
      }
    }
  }

  unLink(file_name)

  return notes
}
