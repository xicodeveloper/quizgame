
//--------------------------
function checkAuthenticated_Home(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Home(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/home");
  }
  next();
}
//---------------------
//--------------------------
function checkAuthenticated_Friends(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Friends(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/friends");
  }
  next();
}
//---------------------
//--------------------------
function checkAuthenticated_Anch(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Anch(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/anch");
  }
  next();
}
//---------------------
//--------------------------
function checkAuthenticated_Add(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Add(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/add/new");
  }
  next();
}
//---------------------
//--------------------------
function checkAuthenticated_Chat(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Chat(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/chat");
  }
  next();
}
//---------------------
//--------------------------
function checkAuthenticated_Create(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Create(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/create");
  }
  next();
}
//--------------------------
function checkAuthenticated_End(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_End(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/end");
  }
  next();
}
//--------------------------
function checkAuthenticated_insideProfile(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_insideProfile(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/insideProfile");
  }
  next();
}
//--------------------------
function checkAuthenticated_message(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_message(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/message");
  }
  next();
}
function checkAuthenticated_profile(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_profile(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile/:id");
  }
  next();
}
function checkAuthenticated_q(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_q(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/question");
  }
  next();
}
function checkAuthenticated_Rooms(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Rooms(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/room");
  }
  next();
}
function checkAuthenticated_Rank(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated_Rank(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/rank");
  }
  next();
}
module.exports = {
  checkAuthenticated_Friends,
  checkNotAuthenticated_Friends,
  checkAuthenticated_Home,
  checkNotAuthenticated_Home,
  checkAuthenticated_Anch,
  checkNotAuthenticated_Anch,
  checkAuthenticated_Add,
  checkNotAuthenticated_Add,
  checkNotAuthenticated_Chat,
  checkAuthenticated_Chat,
  checkNotAuthenticated_Create,
  checkAuthenticated_Create,
  checkNotAuthenticated_End,
  checkAuthenticated_End,
  checkNotAuthenticated_insideProfile,
  checkAuthenticated_insideProfile,
  checkNotAuthenticated_message,
  checkAuthenticated_message,
  checkAuthenticated_profile,
  checkNotAuthenticated_profile,
  checkAuthenticated_q,
  checkNotAuthenticated_q,
  checkAuthenticated_Rooms,
  checkNotAuthenticated_Rooms,
  checkAuthenticated_Rank,
  checkNotAuthenticated_Rank,
};
