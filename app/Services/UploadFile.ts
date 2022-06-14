import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs'
import path from 'path'

async function uploadFile(file: MultipartFileContract, folder: string): Promise<string> {
  const randomName =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const contentType = file.headers['content-type']
  const visibility = 'public'
  const fileName = `${randomName}-${file.clientName}`

  await file.move(Application.tmpPath(`${folder}`), { name: fileName })

  const filePath = path.resolve('tmp', folder, fileName)
  const fileStream = fs.createReadStream(filePath)

  const s3Path = `${folder}/${fileName}`
  const s3Drive = Drive.use('s3')
  await s3Drive.putStream(s3Path, fileStream, {
    contentType,
    visibility,
  })
  const fileUrl = await s3Drive.getUrl(s3Path)

  fileStream.destroy()
  await Drive.delete(filePath)

  return fileUrl
}

function deleteFile(path: string): void {}

export { uploadFile, deleteFile }
