const Person = require("../models/Person");
const router = require("express").Router();


// CREATE
router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({error: "'name' is required."});
    return;
  }
  else if (!salary) {
    res.status(422).json({error: "'salary' is required."});
    return;
  }

  const person = {
    name,
    salary,
    approved
  }

  try {
    await Person.create(person);

    res.status(201).json({message: 'Person added to the database successfully.'});
  } catch (error) {
    res.status(500).json({error: error});
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({error: error});
  }
})

// READ BY ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findById(id);

    if (!person) {
      res.status(422).json({message: 'Person not found.'});
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({error: error});
  }
})

// UPDATE
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({message: 'Person not found.'});
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({error: error});
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findById(id);

    if (!person) {
      res.status(422).json({message: 'Person not found.'});
      return;
    }

    try {
      await Person.deleteOne({ _id: id });

      res.status(200).json({message: 'Person deleted successfully.'});
    } catch (error) {
      res.status(500).json({error: error});
    }
})

module.exports = router;