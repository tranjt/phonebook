const mongoose = require('mongoose')

if (process.argv.length < 5) {
    console.log('give password as argument')
    process.exit(1)
}


const user = process.argv[2]
const password = process.argv[3]
const name = process.argv[4]
const number = process.argv[5]

const url = `mongodb+srv://${user}:${password}@cluster0-vs3mw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

let person
if (name && number) {
    person = new Person({ name, number })
}

if (person) {
    person.save().then(response => {
        console.log(response)
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log( `${person.name} ${person.number}` )
        })
        mongoose.connection.close()
    })
}


