/*
    Author: Shiva Shankar Pandillapalli
    Banner: B00880049
    Feature: Posts
    Task: API's for creation, updation, deletion and getting information of posts
*/

const express = require("express");

const router = express.Router();

const createPostModel = require("../../models/createPostModel");

const getCurrentTime = (date) => {
    return (
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        " " +
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear()
    );
};

//http://localhost:3000/posts/create

router.post("/create", (req, res) => {
    try {
        const {
            postId,
            firstName,
            lastName,
            email,
            postedTime,
            address,
            name,
            description,
            unitType,
            quantity,
            availability,
            condition,
            images,
        } = req.body;

        let post = new createPostModel({
            postId,
            firstName,
            lastName,
            email,
            postedTime: getCurrentTime(new Date()),
            address,
            name,
            description,
            unitType,
            quantity,
            availability,
            condition,
            images,
        });

        post.save(function (err) {
            if (err) {
                throw err;
            } else {
                return res.status(200).json({
                    message: "Post created successfully",
                    success: true,
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
            success: false,
        });
    }
});

//http://localhost:3000/posts/update

router.put("/update", async (req, res) => {
    try {
        const {
            _id,
            name,
            description,
            unitType,
            quantity,
            availability,
            condition,
            images,
        } = req.body;

        let doc = await createPostModel.findById({ _id: _id });

        doc.name = name;
        doc.postedTime = getCurrentTime(new Date());
        doc.description = description;
        doc.unitType = unitType;
        doc.availability = availability;
        doc.condition = condition;
        doc.images = images;
        doc.quantity = quantity;

        doc.save()
            .then((result) => {
                return res.status(200).json({
                    message: "updated successfully",
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

//http://localhost:3000/posts/delete

router.post("/delete", (req, res) => {
    try {
        const id = req.body.postId;
        createPostModel.findByIdAndRemove(id, (error, result) => {
            if (error) throw error;
            else {
                return res.status(200).json({
                    message: "record deleted successfully",
                    success: true,
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

//http://localhost:3000/posts/{postid}

router.get("/:id?", (req, res) => {
    try {
        let id = req.params.id;
        createPostModel.findById({ _id: id }, (error, result) => {
            if (error) throw error;
            else {
                return res.status(200).json({ result });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

module.exports = router;
