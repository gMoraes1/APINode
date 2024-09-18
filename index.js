// Config inicial
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/Person')
const app = express()


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Primeira rota
app.get('/', (req, res) => {
    res.send({ message: 'Bem-vindo ao meu servidor' })
})
//Create
app.post('/person', async (req, res) => {
    const {name, age, approved} = req.body
    const person = {
        name,
        age,
        approved
    }
    try{
        await Person.create(person)
        res.status(201).send({message: 'Pessoa criada com sucesso'})
    }
    catch(err){
        res.status(400).send({erro:error})
    }
}
)

//read
app.get('/person', async (req, res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    }
    catch(err){
        res.status(400).send({message: 'Erro ao buscar pessoas'})
    }
}
)

//update
app.put('/person/:id', async (req, res) => {
    const {name, age, approved} = req.body
    const {id} = req.params
    try{
        await Person.findByIdAndUpdate(id, {name, age, approved})
        res.status(200).send({message: 'Pessoa atualizada com sucesso'})
    }
    catch(err){
        res.status(400).send({message: 'Erro ao atualizar pessoa'})
    }
}
)


mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('Conectado ao banco de dados')
    app.listen(3000)
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err)
})
