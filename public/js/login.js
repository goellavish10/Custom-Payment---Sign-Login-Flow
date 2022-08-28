const postLogin = async () => {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (data.success === false) {
      alert(data.message);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
