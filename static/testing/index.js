fetch(`/api/addFood`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    item: "ham",
    brand: "walmart",
    expDate: new Date(),
  }),
})
  .then((r) => r.json())
  .then(console.log);
