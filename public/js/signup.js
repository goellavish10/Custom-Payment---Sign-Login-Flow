const postSignUp = async () => {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone-number-input").value;
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    if (
      email === "" ||
      password === "" ||
      phone === "" ||
      username === "" ||
      name === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    const check = document.getElementById("checkbox").checked;
    if (!check) {
      alert("Please accept Terms & Conditions");
      return;
    }
    const dataObj = {
      email,
      password,
      phone,
      username,
      name,
      check
    };
    const response = await fetch("/api/v1/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataObj)
    });

    const data = await response.json();

    console.log(data);

    if (data.success === false) {
      alert(data.message);
      return;
    }

    window.location.href = data.redirectURI;
  } catch (err) {
    console.log(err);
  }
};
