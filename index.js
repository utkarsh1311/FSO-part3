const express = require("express");
const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
