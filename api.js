#!/usr/bin/env node

const http = require('http');
const yargs = require('yargs/yargs')
const { hideBin} = require('yargs/helpers')
const dot = require("dotenv").config()

const apiKey = dot.parsed.TOKEN_API

const argv = yargs(hideBin(process.argv)).argv

let nameFile = argv._[0]

const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${nameFile}`

http.get(url, (res) => {
  const {statusCode} = res
  if (statusCode !== 200){
    console.log(`statusCode: ${statusCode}`)
    return
  }
  res.setEncoding('utf8')
  let rowData = ''
  res.on('data', (chunk) => rowData += chunk)
  res.on('end', () => {
    let parseData = JSON.parse(rowData)
    console.log(
      `
      -----------------------------------------
       Сейчас в ${parseData.location.name} ${parseData.current.temperature} °C
       Регион ${parseData.location.region} 
       Страна ${parseData.location.country} 
       -----------------------------------------
       wind_speed: ${parseData.current.wind_speed}
       wind_degree: ${parseData.current.wind_degree}
       -----------------------------------------
      `
    )
  })
})