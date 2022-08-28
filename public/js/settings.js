let navbar = document.querySelector(".header .navbar");
let settings = document.querySelector(".settings");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  settings.classList.toggle("settings-active");
};

const updateUserDetails = async () => {
  try {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_pass").value;

    const dataObj = {
      name,
      username,
      phone,
      password,
      confirmPassword
    };
    const storedUsername = localStorage.getItem("username");
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");

    if (
      name === storedName &&
      username === storedUsername &&
      storedPhone === phone
    ) {
      alert("Please udpate the fields");
      return;
    }

    const response = await fetch(`/api/v1/auth/account/${storedUsername}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        application_header: localStorage.getItem("application_header"),
        userid: localStorage.getItem("userId")
      },
      body: JSON.stringify(dataObj)
    });

    const data = await response.json();

    if (data.success === false) {
      alert(data.message);
      return;
    } else {
      alert(data.message);
      window.location.reload();
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
