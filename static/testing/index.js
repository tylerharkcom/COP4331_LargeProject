fetch(`/api/addFood`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    item: "ham",
    brand: "publix",
    expDate: new Date(),
  }),
})
  .then((r) => r.json())
  .then(console.log);
