"use strict";
const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const authMiddlware = require("../middleware/auth");

router.get("/user", authMiddlware, postController.userPosts);
router.get("/:post_id", authMiddlware, postController.one);
router.get("/", authMiddlware, postController.all);
router.post("/", authMiddlware, postController.create);
router.delete("/:post_id", authMiddlware, postController.deletePost);

module.exports = router;
