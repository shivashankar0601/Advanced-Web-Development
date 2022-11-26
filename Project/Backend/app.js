const express = require("express");
const app = express();
const cors = require("cors");
//------------------------Enabling CORS -----------------------------
app.use(cors());
// app.options("*", cors({origin: '*'})); // testing 

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "200mb", extended: false }));
app.use(bodyParser.json({ limit: "200mb" }));

const mongoose = require("mongoose");




mongoose.connect(
    "mongodb+srv://root:root@cluster0.3zuha.mongodb.net/shareIT?retryWrites=true&w=majority"
);

//-----------------------ADMIN MODULE ENDPOINTS START ---------------

const adminPendingApplication = require("./api/routes/adminDashboard/adminPendingApplication");
const adminProfiles = require("./api/routes/adminDashboard/adminProfile");
const adminMainPage = require("./api/routes/adminDashboard/adminMainPage");
const adminTransactions = require("./api/routes/adminDashboard/adminTransaction");
const adminSignIn = require("./api/routes/adminDashboard/adminSignIn");

const commonAdminRoute = "/admin";

app.use(commonAdminRoute, adminProfiles);
app.use(commonAdminRoute, adminPendingApplication);
app.use(commonAdminRoute, adminMainPage);
app.use(commonAdminRoute, adminTransactions);
app.use(commonAdminRoute, adminSignIn);
//-----------------------ADMIN MODULE ENDPOINTS END   ---------------

//-----------------------AUTH MODULE ENDPOINTS START ---------------

const authRegAndSign = require("./api/routes/UserManagementModule/AuthLoginSignup");
const authProfile = require("./api/routes/UserManagementModule/AuthProfile");
const commonAuthRoute = "/auth";
app.use(commonAuthRoute, authRegAndSign);
app.use(commonAuthRoute, authProfile);

//-----------------------AUTH MODULE ENDPOINTS END   ---------------

//-----------------------Feedback MODULE ENDPOINTS START ---------------

const feedbackAdd = require("./api/routes/FeedbackModule/feedbackUtils");
const commonFeedbackRoute = "/feedback";
app.use(commonFeedbackRoute, feedbackAdd);

//-----------------------Feedback MODULE ENDPOINTS END ---------------
//-----------------------Inventory MODULE ENDPOINTS START ---------------

const inventoryAdd = require("./api/routes/Inventory/invUtil");
const commonInventoryRoute = "/inventory";
app.use(commonInventoryRoute, inventoryAdd);

//-----------------------Inventory MODULE ENDPOINTS END ---------------

//-----------------------FeedOfProfiles Module ENDPOINTS START ---------------

const fetchProfiles = require("./api/routes/ExploreProfilesModule/FetchProfiles");
const fetchPosts = require("./api/routes/ExplorePostsModule/FetchPosts");
const commonFeedRoute = "/feed";
app.use(commonFeedRoute, fetchProfiles);
app.use(commonFeedRoute, fetchPosts);

//-----------------------FeedOfProfiles MODULE ENDPOINTS END   ---------------

//-----------------------POSTS MODULE ENDPOINTS START   ---------------
/* Author: Shiva Shankar Pandillapalli */
const posts = require("./api/routes/Posts/posts");
app.use("/posts", posts);

//-----------------------POSTS MODULE ENDPOINTS END   ---------------

//-----------------------LIKE AND ALERTS MODULE ENDPOINTS START   ---------------
/* Author: Shiva Shankar Pandillapalli */
const like = require("./api/routes/Like/like");
app.use("/like", like);

//-----------------------LIKE AND ALERTS MODULE ENDPOINTS END   ---------------

//-----------------------CHAT MODULE ENDPOINTS START ---------------

const messageRoutes = require("./api/routes/ChatModule/chat");
const userHistoryRoutes = require("./api/routes/ChatModule/userHistory");
const commonChatRoute = "/chat";
app.use(commonChatRoute, messageRoutes);
app.use(commonChatRoute, userHistoryRoutes);

//-----------------------CHAT MODULE ENDPOINTS END   ---------------

//-----------------------Payment MODULE ENDPOINTS START ---------------

const paymentRoutes = require("./api/routes/PaymentModule/payment");
const commanPaymentRoutes = "/payment";
app.use(commanPaymentRoutes, paymentRoutes);

//-----------------------Payment MODULE ENDPOINTS END   ---------------


//-----------------------REWARD MODULE ENDPOINTS START   ---------------

const getAllRewards = require("./api/routes/rewards/rewards");
const commonRewardRoute = "/reward";
app.use(commonRewardRoute, getAllRewards);


//-----------------------REWARD MODULE ENDPOINTS END   ---------------

//-----------------------LEADERBOARD MODULE ENDPOINTS END   ---------------

const getLeaderboard = require("./api/routes/leaderboard/leadernoard");
const commonLeaderboardRoute = "/leaderboard";
app.use(commonLeaderboardRoute, getLeaderboard);

//-----------------------LEADERBOARD MODULE ENDPOINTS END   ---------------
//-----------------------Recommend User Start ----------------------

const recommendRoutes = require('./api/routes/RecommendUser/recommendUser');
const commonRecommendRoute = "/recommend";
app.use(commonRecommendRoute, recommendRoutes);


app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint Not found",
    });
});

module.exports = app;
