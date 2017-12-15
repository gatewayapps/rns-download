import http from 'http'

export default function download (projectId, version, scope) {
  return new Promise((resolve, reject) => {
    const url = `http://releases.gatewayapps.com/api/projects/${projectId}/notes?version=${version}&scope=${scope}`
    http.get(url, (res) => {
      const statusCode = res.statusCode
      const contentType = res.headers['content-type']

      let error

      if (statusCode !== 200) {
        error = new Error(`Request Failed.\nStatus Code: ${statusCode}`)
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`)
      }
      if (error) {
        reject(error)
        // consume response data to free up memory
        res.resume()
        return
      }

      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        try {
          const response = JSON.parse(rawData)

          if (response.success === true) {
            resolve(response.versions)
            return
          } else {
            reject(new Error(`Failed to get release notes: ${response.message}`))
            return
          }
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
}
