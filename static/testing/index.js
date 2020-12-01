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
        "1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b",
    }),
  }).then((r) => r.json());

  await fetch(`/api/loadFeed`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((r) => r.json());
}
