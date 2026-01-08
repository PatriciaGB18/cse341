const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
    // GET route to fetch ALL contacts
    router.get('/', async (req, res) => {
        try {
            const contacts = await db.collection('contacts').find().toArray();
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // GET route to fetch a SINGLE contact by ID
    router.get('/:id', async (req, res) => {
        try {
            const contactId = new ObjectId(req.params.id);
            const contact = await db.collection('contacts').findOne({ _id: contactId });
            
            if (!contact) {
                return res.status(404).json({ message: "Contact not found" });
            }
            
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ message: "Invalid ID format or server error" });
        }
    });

    return router;
};