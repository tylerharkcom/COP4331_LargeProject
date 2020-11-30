myFunction();
async function myFunction() {
  await fetch(`/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "intelscape",
      password:
        "13e4ae9a195a5f2cbb46f755b61789ee64a0c1ea14d56b90d0c2c0ab331c99a3",
    }),
  })
    .then((r) => r.json())
    .then(console.log);

  await fetch(`/api/editFood`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: "kebab",
      expDate: "2020-12-26",
      foodAmt: "6969",
      foodUt: "gal",
    }),
  })
    .then((r) => r.json())
    .then(console.log);
}
