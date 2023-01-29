document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    console.log(event.target.closest("li").innerText);
    let valueOfElement = event.target
      .closest("li")
      .innerText.split("\n")[0]
      .trim();
    valueOfElement;
    const newValue = prompt("Введите новое название", valueOfElement);
    if (newValue === null) {
      return;
    } else
      edit(id, newValue).then(
        () =>
          (event.target.closest("li").innerHTML = `
              ${newValue}
              <div>
                <button class="btn btn-primary" data-type="edit" data-id=${id}>
                  Редактировать
                </button>
                <button class="btn btn-danger" data-type="remove" data-id=${id}>
                  &times;
                </button>
              </div>
            `)
      );
  }
});

async function edit(id, newValue) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id: id, title: newValue }),
    headers: {
      "Content-type": "application/json",
    },
  });
}
