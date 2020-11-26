import axios from "axios";

export default {
  login: function (loginInfo) {
    return axios.post('/api/users/login', loginInfo);
  },

  signup: function (signupInfo) {
    return axios.post('/api/users/signup', signupInfo);
  },

  isLoggedIn: function () {
    return axios.get('/api/users/profile');
  },

  logout: function () {
    return axios.get('/api/users/logout');
  },

  getUserData: function(id){
    return axios.get("/api/login/" + id)
  },

  postPost: function(data){
    return axios.post("/api/post", data)
  },

  newsfeed: function(){
    return axios.get("/api/newsfeed")
  },

  deletePost: function(id) {
    return axios.delete("/api/post/" + id);
  },

  getPost: function(id){
    return axios.get("/api/post/" +id)
  },
  
  postComment: function(data){
    return axios.post("/api/comments",data)
  },

  getComment: function(id){
    return axios.get("/api/comments/"+id)
  },

  getNFL: function (){
    return axios.get("/api/sportsdata")
  },

  getSportsNews: function () {
    return axios.get("/api/sportsnews")
  },

  getUpdateProfilePic(profilePic){
    return axios.post("/api/profile/", profilePic)
  },

  getUsers(){
    return axios.get("/api/usersdata")
  },

  getUser(id){
    return axios.get("/api/usersdata/"+id)
  },


  postBet(data){
    console.log(data)
    return axios.post("/api/bets", data )
  }

  
};
