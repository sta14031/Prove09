const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.post('/getRate', (req, res) => {
  let weight = req.body.weight
  let type = req.body.mailType
  res.render('pages/result', {
    weight: weight + " ounces",
    type: decodeType(type),
    rate: "$" + calculateRate(weight, type).toFixed(2)
  }) 
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calculateRate(weight, type) {
  if (type == "stamp") {
         if (weight <= 1)
      return 0.55
    else if (weight <= 2)
      return 0.7
    else if (weight <= 3)
      return 0.85
    else if (weight <= 3.5)
      return 1.0  
  }
  else if (type == "meter") {
         if (weight <= 1)
      return 0.5
    else if (weight <= 2)
      return 0.65
    else if (weight <= 3)
      return 0.8
    else if (weight <= 3.5)
      return 0.95
  }
  else if (type == "envelopes") {
           if (weight <= 1)
        return 1.0
      else if (weight <= 2)
        return 1.15
      else if (weight <= 3)
        return 1.30
      else if (weight <= 4)
        return 1.45
      else if (weight <= 5)
        return 1.60
      else if (weight <= 6)
        return 1.75
      else if (weight <= 7)
        return 1.90
      else if (weight <= 8)
        return 2.05
      else if (weight <= 9)
        return 2.20
      else if (weight <= 10)
        return 2.35
      else if (weight <= 11)
        return 2.50
      else if (weight <= 12)
        return 2.65
      else if (weight <= 13)
        return 2.80
  }
  else if (type == "retail") {
         if (weight <= 4)
      return 3.66
    else if (weight <= 8)
      return 4.39
    else if (weight <= 12)
      return 5.19
    else if (weight <= 13)
      return 5.71
  }
}

function decodeType(type) {
  if (type== "stamp")
    return "Letters (Stamped)"
  else if (type== "meter")
    return "Letters (Metered)"
  if (type== "envelopes")
    return "Large Envelopes (Flats)"
  if (type== "retail")
    return "First-Class Package Service &mdash; Retail"
}