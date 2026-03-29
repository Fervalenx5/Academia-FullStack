const tablaOrientadores = document.getElementById("tablaOrientadores");
const formOrientador = document.getElementById("formOrientador");
const mensajeOrientador = document.getElementById("mensajeOrientador");

async function obtenerOrientadores() {
  try {
    const response = await fetch(`${API_URL}/orientadores`);
    const orientadores = await response.json();
    renderizarOrientadores(orientadores);
  } catch (error) {
    tablaOrientadores.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-danger">Error al cargar orientadores</td>
      </tr>
    `;
  }
}

function renderizarOrientadores(orientadores) {
  if (!orientadores || orientadores.length === 0) {
    tablaOrientadores.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-muted">No hay orientadores registrados</td>
      </tr>
    `;
    return;
  }

  tablaOrientadores.innerHTML = orientadores.map((orientador) => `
    <tr>
      <td>${orientador.nombreApellido ?? "-"}</td>
      <td>${orientador.especialidad ?? "-"}</td>
      <td>${orientador.email ?? "-"}</td>
    </tr>
  `).join("");
}

formOrientador.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoOrientador = {
    nombreApellido: document.getElementById("nombreApellidoOrientador").value.trim(),
    especialidad: document.getElementById("especialidadOrientador").value.trim(),
    email: document.getElementById("emailOrientador").value.trim()
  };

  try {
    const response = await fetch(`${API_URL}/orientadores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoOrientador)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "No se pudo guardar el orientador");
    }

    mensajeOrientador.innerHTML = `
      <div class="alert alert-success mb-0">
        Orientador guardado correctamente.
      </div>
    `;

    formOrientador.reset();
    await obtenerOrientadores();

  } catch (error) {
    mensajeOrientador.innerHTML = `
      <div class="alert alert-danger mb-0">
        ${error.message}
      </div>
    `;
  }
});

obtenerOrientadores();