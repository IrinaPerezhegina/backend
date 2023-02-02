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
const blur = new Object();
document.addEventListener("click", (event) => {
  const data = event.target.closest("input")?.value;
  if (data) {
    blur.id = data;
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    let get = event.target.closest("li").innerText.split("\n")[0];

    event.target.closest("li").innerHTML = `
              <input  type='text' id=${id} value='${
      event.target.closest("li").innerText.split("\n")[0]
    }' name='example'/>
              <div>
                <button class="btn btn-success" data-type="save" data-id=${id}>
                  Обновить
                </button>
                <button class="btn btn-danger" data-type="exit" data-id=${id}>
                 Отменить
                </button>
              </div>
            `;
  } else if (event.target.dataset.type === "save") {
    blur.id = undefined;
    const id = event.target.dataset.id;
    const valueOfElement = document.querySelector(
      "input[name='example']"
    ).value;
    console.log(blur);
    edit(id, valueOfElement).then(
      () =>
        (event.target.closest("li").innerHTML = `
                    ${
                      valueOfElement === ""
                        ? "Введите значение"
                        : valueOfElement
                    }
                    <div>
                      <button class="btn btn-primary" data-type="edit" data-id=${id}>
                       Обновить
                      </button>
                      <button class="btn btn-danger" data-type="remove" data-id=${id}>
                        &times;
                      </button>
                    </div>
                  `)
    );
  } else if (event.target.dataset.type === "exit") {
    const id = event.target.dataset.id;
    event.target.closest("li").innerHTML = `
    ${
      blur.id === undefined
        ? document.querySelector("input[name='example']").value
        : blur.id
    }
    <div>
      <button class="btn btn-primary" data-type="edit" data-id=${id}>
       Обновить
      </button>
      <button class="btn btn-danger" data-type="remove" data-id=${id}>
        &times;
      </button>
    </div>
  `;
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
