const express = require('express')
const Joi = require('joi')
const nodemon = require('nodemon')
const app = express()
app.use(express.json()) //will parse req.body into json format



// progLangs == Programming Languages
const progLangs = [ //ARRAYS in JS
    {
        id: 1,
        name: "progLang1"
    },
    { id: 2, name: "progLang2" },
    { id: 3, name: "progLang3" }
]



//Getting all workshops//
//Getting specific workshops
//create new workshops                         
//Update an existing workshops
//delete an existing workshop


app.get('/', (req, res) => { //reqest and response
    res.send('Hello User!')
})
app.get('/api/progLangs', (req, res) => {
    res.send(progLangs)
})

//GET ROUTE Enables to get respond from the server
app.get('/api/progLangs/:id', (req, res) => {
    const progLang = progLangs.find(w => w.id === parseInt(req.params.id))
    if (!progLang) return res.status(404).send('Request not found.')
    res.send(progLang)
})


//POST ROUTE > Enables you to create a new progLangs
app.post('/api/progLangs/', (req, res) => {
        const schema = {
            name: Joi.string().min(3).required()
        }
        const result = Joi.validate(req.body, schema)
        if (result.error) return res.status(400).send(result.error.details[0].message)
        const progLang = {
            id: progLangs.length + 1,
            name: req.body.name
        }
        progLangs.push(progLang)
        res.send(progLangs)

    })
    //PUT ROUTE:ennables you to update data item

app.put('/api/progLangs/:id', (req, res) => {
        //id check 
        const progLang = progLangs.find(w => w.id === parseInt(req.params.id))
        if (!progLang) return res.status(404).send("Request not sent")

        //input check
        const schema = {
            name: Joi.string().min(3).required()
        }
        const result = Joi.validate(req.body, schema)
        if (result.error) return res.status(400).send(result.error.details[0].message)

        progLang.name = req.body.name
        res.send(progLangs)
    })
    //DELETE ROUTE: Delete the existing data item




app.delete('/api/progLangs/:id', (req, res) => {
    const progLang = progLangs.find(w => w.id === parseInt(req.params.id))
    if (!progLang) return res.status(404).send("Request not Found")

    const index = progLangs.indexOf(progLang)
    progLangs.splice(index, 1)
    res.send(progLangs)
})



app.listen(3000, () => { console.log('Server is running on port 3000...') })
