fetch("/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "bob",
    password: "supersecure",
  }),
})
  .then((r) => r.json())
  .then(console.log);
