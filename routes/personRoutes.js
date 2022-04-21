const Person = require("../models/Person");
const router = require("express").Router();

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

module.exports = router;