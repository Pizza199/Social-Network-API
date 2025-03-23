const express = require("express");
const router = express.Router();
const Thought = require("../Models/Thoughts");
const User = require("../Models/User");

router.get("/api/thoughts", async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.get("/api/thoughts/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate("reactions");
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.post("/api/thoughts", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
        const thought = await Thought.create(req.body);
        user.thoughts.push(thought);
        await user.save();
        res.status(200).json(thought);
        
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.put("/api/thoughts/:id", async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);   
    }
});
router.delete("/api/thoughts/:id", async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.post("/api/thoughts/:thoughtId/reactions", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }
        thought.reactions.push(req.body);
        await thought.save();
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.delete("/api/thoughts/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        const thought = await Thoughthought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID" });
        }
        thought.reactions.pull(req.params.reactionId);
        await thought.save();
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
module.exports = router;