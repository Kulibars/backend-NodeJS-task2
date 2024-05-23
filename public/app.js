console.log("Hello from app.js!");

document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  const title = document.getElementById(`${id}`);

  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "editing") {
    const newTitle = prompt("Введите новый текст", "");

    edit(id, newTitle).then(() => {
      title.textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: newTitle,
      id,
    }),
  });
}
