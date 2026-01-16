const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
    // GET ALL
    router.get('/', async (req, res) => {
        try {
            const contacts = await db.collection('contacts').find().toArray();
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // GET SINGLE
    router.get('/:id', async (req, res) => {
        try {
            const contactId = new ObjectId(req.params.id);
            const contact = await db.collection('contacts').findOne({ _id: contactId });
            if (!contact) return res.status(404).json({ message: "Contact not found" });
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ message: "Invalid ID format" });
        }
    });

    
    router.post('/', async (req, res) => {
        try {
            const contact = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            };
            const response = await db.collection('contacts').insertOne(contact);
            res.status(201).json({ id: response.insertedId });
        } catch (error) {
            res.status(500).json({ message: "Error creating contact" });
        }
    });

    
    router.put('/:id', async (req, res) => {
        try {
            const contactId = new ObjectId(req.params.id);
            const contact = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            };
            await db.collection('contacts').replaceOne({ _id: contactId }, contact);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error updating contact" });
        }
    });

    
    router.delete('/:id', async (req, res) => {
        try {
            const contactId = new ObjectId(req.params.id);
            await db.collection('contacts').deleteOne({ _id: contactId });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting contact" });
        }
    });

    return router;
};