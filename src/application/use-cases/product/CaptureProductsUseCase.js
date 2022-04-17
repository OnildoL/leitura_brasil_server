import { pipeline, Transform } from "stream"
import { createReadStream } from "fs"
import { promisify } from "util"
import { database } from "../../../main/app.js"
import { unLink } from "../../../main/utils/unlink"
import csvtojson from "csvtojson"

const pipelineAsync = promisify(pipeline)

export async function CaptureProductsUseCase(file_name, store) {
  const combinedStreams = createReadStream(`uploads/${file_name}`)

  const handleStream = new Transform({
    transform: (chunk, encoding, callback) => {
      const data = JSON.parse(chunk)
      
      if (data["[Item] NCM"]) {
        const [icms,] = data["[Item] Alíquota ICMS"].split(".")
        const [ipi,] = data["[Item] Alíquota IPI"].split(".")

        const output = {
          access_key: data["Chave de Acesso"],
          code: data["[Item] Código"],
          description: data["[Item] Descrição"],
          isbn: data["[Item] EAN"],
          ncm: data["[Item] NCM"],
          cfop: data["[Item] CFOP"],
          qnd: parseInt(data["[Item] Quantidade"].replace(",", ".")),
          unit: Number(data["[Item] Valor Unitário"].replace(",", ".")),
          icms: icms.replace("%", ""),
          ipi: ipi.replace("%", ""),
          store,
          registration: "",
          hangtag: 0,
          price: "",
          amount_children: 0,
        }
  
        return callback(null, JSON.stringify(output))
      }

      return callback()
    }
  })

  const insertProductsDatabase = new Transform({
    transform: async (chunk, encoding, callback) => {
      const data = JSON.parse(chunk)
      
      await database("products").insert(data)

      return callback()
    }
  })

  await pipelineAsync(
    combinedStreams,
    csvtojson(),
    handleStream,
    insertProductsDatabase,
  )

  unLink(file_name)

  return
}
