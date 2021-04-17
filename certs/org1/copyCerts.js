const fs = require('fs')

const walletPath = process.argv[2]

if ( walletPath == undefined ) {
  throw 'walletPath is required'
}

const filterList = ['.gitkeep', 'admin.id']

const entries = fs.readdirSync(walletPath).
  filter((filename) => !filterList.includes(filename))

entries.forEach((filename, index) => {
  const fullPath = `${walletPath}/${filename}`

  const fileContent = fs.readFileSync(fullPath)
  const jsonObject = JSON.parse(fileContent)

  const isExists = fs.existsSync(`./user${index + 1}.pem`) && fs.existsSync(`./user${index + 1}.key`)

  if ( isExists ) {
    fs.rmSync(`./user${index + 1}.pem`)
    fs.rmSync(`./user${index + 1}.key`)
  }

  fs.writeFileSync(`./user${index + 1}.pem`, jsonObject.credentials.certificate.toString())
  fs.writeFileSync(`./user${index + 1}.key`, jsonObject.credentials.privateKey.toString())
})