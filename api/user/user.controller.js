"use strict";

let users = [
  {
    id: 1,
    name: 'Alice'
  },
  {
    id: 2,
    name: 'Beck'
  },
  {
    id: 3,
    name: 'Chris'
  }
];

exports.index = (req, res) => {
  res.json(users);
};

exports.show = (req, res) => {
  //res.json(users[req.params.id - 1]);
  // id
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400)
              .json({error: 'Invalid id'});
  }
  // user
  const user = users.filter(user => {return user.id === id}).pop();
  if (!user) {
    return res.status(400)
              .json({error: 'user not exist'});
  }
  // response
  res.json(user);
};

exports.destroy = (req, res) => {
  // id
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(404)
              .json({error: 'Invalid id'});
  }
  // index
  const userIndex = users.findIndex( user => {
    return user.id === id;
  });

  if (userIndex < 0) {
    return res.status(404)
              .json({error: 'user not exist'});
  }

  // remove
  users.splice(userIndex, 1);

  // response
  res.status(204).send();
};

exports.create = (req, res) => {
  const name = req.body.name.trim() || false;
  if (!name) {
    return res.status(400)
              .json({error : 'Invalid name'});
  }

  const id = users.reduce( (maxId, user) => {
    return user.id > maxId ? user.id : maxId;
  }, 0) + 1;

  const newUser = {
    id: id,
    name: name
  };
  users.push(newUser);

  res.status(201).json(newUser);
};
