require('dotenv').config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require('./models/person');

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
	response.send("Hello world");
});

app.get("/api/persons", (request, response) => {
	Person.find({}).then(persons => {
        response.json(persons);
    })
});

app.get("/info", (request, response) => {
	response.send(
		`Phonebook has info for ${persons.length} people <br/> ${new Date()}`
	);
});

app.get("/api/persons/:id", (request, response) => {
	const ID = +request.params.id;

	const person = persons.find((p) => p.id === ID);
	if (!person) {
		return response.status(404).end();
	}
	response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
	const ID = +request.params.id;
	persons = persons.filter((person) => person.id !== ID);
	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name && !body.number) {
		return response.status(400).json({
			error: "name and number is not specified in the request body",
		});
	}
	if (!body.name) {
		return response.status(400).json({
			error: "name field is not speficied",
		});
	}
	if (!body.number) {
		return response.status(400).json({
			error: "number field is not specified",
		});
	}

	const newPerson = new Person({
        name: body.name,
        number: body.number
    })

	newPerson.save().then(savedPerson => response.json(savedPerson));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
