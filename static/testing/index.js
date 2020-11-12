fetch(`/api/addFood`, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    item: "bread",
    brand: "wonderbread",
    expDate: new Date(),
  }),
})
  .then((r) => r.json())
  .then(console.log);
