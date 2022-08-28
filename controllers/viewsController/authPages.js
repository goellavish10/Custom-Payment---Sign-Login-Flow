module.exports.homepage = (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server Error! Please reload page or try again later!"
    });
  }
};

module.exports.signUpPage = (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error!, please try again later"
    });
  }
};

module.exports.loginPage = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.render("error", {
      message: "Server error!, please try again later"
    });
  }
};
