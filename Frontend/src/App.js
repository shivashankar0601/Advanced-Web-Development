import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import StarFeedback from "./Feedback/StarFeedback.tsx";
import UserProfile from "./UserProfile/UserProfile.tsx";
import SuccFeedbk from "./Feedback/Success.tsx";
import ShowInv from "./Inventory/ShowInv.tsx";
import AddItm from "./Inventory/addItem.tsx";
import Profile from "./FeedUserProfiles/Profile";
import ProfileFeed from "./FeedUserProfiles/ProfileFeed.js";
import Rewards from "./Rewards/rewards.js";
import PostFeed from "./FeedPosts/PostFeed.js";
import Checkout from "./Payment/Checkout";
import Payment from "./Payment/Payment";
import Chatbar from "./Chat/Chatbar";
import MainPage from "./AdminDashboard/Pages/mainPage";
import TransactionPage from "./AdminDashboard/Pages/TransactionPage";
import ProfilePage from "./AdminDashboard/Pages/ProfilePage";
import NewUsersPage from "./AdminDashboard/Pages/NewUserPage";
import Auth from "./UserAuth/containers";
import AdminLogin from "./AdminAuth/adminLogin";
import Forgotpassword from "./UserAuth/components/forgotpassword";
import CreatePost from "./Posts/CreatePost";
import UpdatePost from "./Posts/UpdatePost";
import ViewPost from "./Posts/ViewPost";
import ShowFeedback from "./Feedback/showFeedback";
import { StateProvider } from "./Payment/StateContext";
import { Grid, Box } from "@mui/material";

import { useEffect, useState } from "react";
import UpdateProfile from "./UserProfile/UpdateProfile";
import { Outlet } from "react-router-dom";
import Main from "./Payment/Payment";

const LoginLayout = () => (
  <Box sx={{ height: "100%", width: "100%" }}>
    <Navbar />
    <Outlet />
  </Box>
);

function App() {
  return (
    <StateProvider>
    <BrowserRouter>
      <Box sx={{ height: "100vh", width: "100vw" }}>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route
              path="/UserProfile/UpdateProfile"
              element={<UpdateProfile />}
            />

            <Route path="/chat" element={<Chatbar />} />
            
              <Route path="/checkout" element={<Payment />} />
            
            <Route path="/feed/profiles" element={<ProfileFeed />} />
            <Route path="/feed/posts" element={<PostFeed />} />
            <Route path="/feed/profiles/profile/:id" element={<Profile />} />
            <Route path="/user/rewards" element={<Rewards />} />
            <Route path="/user/review/:id" element={<StarFeedback />} />
            <Route path="/user/profile/:id" element={<UserProfile />} />
            <Route path="/user/inv/:id" element={<ShowInv />} />
            <Route path="/user/review/success" element={<SuccFeedbk />} />
            <Route path="/user/inv/add/:id" element={<AddItm />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/update" element={<UpdatePost />} />
            <Route path="/posts/view" element={<ViewPost />} />
            <Route path="/user/review/view/:id" element={<ShowFeedback />} />
          </Route>
          <Route path="/" element={<Auth />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/dashboard/signin" element={<AdminLogin />}></Route>
          <Route
            path="/dashboard/transactions"
            element={<TransactionPage />}
          ></Route>
          <Route path="/dashboard/profile" element={<ProfilePage />}></Route>
          <Route path="/dashboard/newUsers" element={<NewUsersPage />}></Route>
          <Route path="/chat" element={<Chatbar />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/feed/profiles" element={<ProfileFeed />} />
          <Route path="/feed/posts" element={<PostFeed />} />
          <Route path="/feed/profiles/profile/:id" element={<Profile />} />
          <Route
            path="/UserProfile/UpdateProfile"
            element={<UpdateProfile />}
          />
          <Route path="/user/rewards" element={<Rewards />} />
          <Route path="/user/review/:id" element={<StarFeedback />} />
          <Route path="/user/profile/:id" element={<UserProfile />} />
          <Route path="/user/inv/:id" element={<ShowInv />} />
          <Route path="/user/review/success" element={<SuccFeedbk />} />
          <Route path="/user/inv/add/:id" element={<AddItm />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/update" element={<UpdatePost />} />
          <Route path="/posts/view" element={<ViewPost />} />
          <Route path="/user/review/view/:id" element={<ShowFeedback />} />
        </Routes>
        {/* </Box>
        </Grid> */}
      </Box>
    </BrowserRouter>
    </StateProvider>
  );
}

export default App;
