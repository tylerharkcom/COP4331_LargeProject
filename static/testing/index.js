fetch(`/api/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "intelscape",
    password:
      "683ae2e98277a795603afc13b04610037cc675a75e3cdfd53e9a6b024898879c",
  }),
})
  .then((r) => r.json())
  .then(console.log);

fetch(`/api/addFood`, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    item: "water",
    brand: "dasani",
    expDate: new Date(),
  }),
})
  .then((r) => r.json())
  .then(console.log);
