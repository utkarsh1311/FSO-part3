const express = require("express");
const app = express();
app.use(express.json());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const generateID = () => Math.floor(Math.random() * 100);

app.get("/", (request, response) => {
	response.send("Hello world");
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
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

	if (persons.some((p) => p.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

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

	const newPerson = {
		id: generateID(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(newPerson);
	response.json(newPerson)
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
