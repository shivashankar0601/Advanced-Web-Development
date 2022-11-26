/*
    Author: Shiva Shankar Pandillapalli
    Banner: B00880049
    Feature: Like and Alerts
    Task: API's for Like and Alert functionalities
*/

const express = require("express");

const router = express.Router();

router.get("/:email?", async (req, res) => {
    try {
        const email = req.params.email;
        const users = require("../../models/user");
        const userData = await users.findOne({ email: email });
        return res.status(200).json({
            likedPosts: userData.likedPosts,
            message: "successfull",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
            success: false,
        });
    }
});

router.put("/update", async (req, res) => {
    try {
        const postId = req.body.postId;
        const email = req.body.email;
        const users = require("../../models/user");
        const userData = await users.findOne({ email: email });

        if (userData.likedPosts.includes(postId)) {
            userData.likedPosts = userData.likedPosts.filter(
                (pid) => pid != postId
            );
        } else {
            userData.likedPosts.push(postId);
        }

        userData
            .save()
            .then((response) => {
                return res.status(200).json({
                    likedPosts: userData.likedPosts,
                    message: "successfull",
                    success: true,
                });
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        return res.status(500).json({
            message: error,
            success: false,
        });
    }
});

module.exports = router;
