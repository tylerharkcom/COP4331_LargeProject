fetch("/api/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "c",
    password: "c",
    fName: "me",
    lName: "meagain",
    email: "memeagain@gmail.com",
  }),
})
  .then((r) => r.json())
  .then(console.log);
