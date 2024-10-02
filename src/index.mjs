import express from 'express';

//const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
    { id: 1, name: 'Item 1'},
    { id: 2, name: 'Item 2'},
    { id: 3, name: 'Item 3'},
    { id: 4, name: 'Item 4'}
];

//GET-all items
app.get('/items', (req, res) => {
    res.json(items);
});

//GET-item by id
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if(item){
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found'});
    }
});

//POST-create a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    }

    items.push(newItem);
    res.status(201).json(newItem);
});

//PUT-update an existing item
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if(item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).json({message: 'Item not found'});
    }
});

//DELETE-delete an item
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === itemId);

    if(index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({message: 'Item not found'});
    }
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})