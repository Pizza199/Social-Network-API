const express = require("express");
const User = require("../Models/User");
const router = express.Router();

router.get("/api/users", async (req, res) => {
    try {
        const users = await User.find().populate("thoughts").populate("friends");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("thoughts").populate("friends");
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.post("/api/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.put("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.delete("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.post("/api/users/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
        const friend = await User.findById(req.params.friendId);
        if (!friend) {
            return res.status(404).json({ message: "No friend with that ID" });
        }
        user.friends.push(friend);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
router.delete("/api/users/:userId/friends/:friendId", async (req, res) => { 
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
        }
        const friend = await User.findById(req.params.friendId);
        if (!friend) {
            return res.status(404).json({ message: "No friend with that ID" });
        }
        user.friends.pull(friend);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);   
    } 
});
module.exports = router;