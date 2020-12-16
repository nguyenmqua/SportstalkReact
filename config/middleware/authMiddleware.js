const auth = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('user authenticated');
      next();
    } else {
      console.log('user not authenticated');
      res.redirect('/api/users/unauthorized');
    }
  },

  logoutUser: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.logout();
      next();
    } else {
      next();
    }
  },

  isAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.admin) {
        next();
      } else {      console.log('user confirmed');

        console.log('you must be an administer to continue');
        res.redirect('/api/users/unauthorized');
      }
    } else {
      res.redirect('/api/users/unauthorized');
    }
  },
};

module.exports = auth;
