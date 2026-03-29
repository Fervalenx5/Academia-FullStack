const tablaOrientados = document.getElementById("tablaOrientados");
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("buscarNombre");
const formOrientado = document.getElementById("formOrientado");
const mensajeFormulario = document.getElementById("mensajeFormulario");
const formAsignarOrientador = document.getElementById("formAsignarOrientador");
const orientadoIdAsignar = document.getElementById("orientadoIdAsignar");
const nombreOrientadoAsignar = document.getElementById("nombreOrientadoAsignar");
const selectOrientadorAsignar = document.getElementById("selectOrientadorAsignar");
const mensajeAsignacion = document.getElementById("mensajeAsignacion");

async function obtenerOrientados() {
  try {
    const response = await fetch(`${API_URL}/orientados`);
    const data = await response.json();
    renderizarOrientados(data);
  } catch (error) {
    tablaOrientados.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">Error al cargar orientados</td>
      </tr>
    `;
  }
}

async function obtenerOrientadoresParaAsignacion() {
  try {
    const response = await fetch(`${API_URL}/orientadores`);
    const orientadores = await response.json();

    selectOrientadorAsignar.innerHTML = `
      <option value="">Seleccionar orientador</option>
      ${orientadores.map((orientador) => `
        <option value="${orientador.id}">
          ${orientador.nombreApellido}
        </option>
      `).join("")}
    `;
  } catch (error) {
    console.error("Error al cargar orientadores:", error);
  }
}

function renderizarOrientados(orientados) {
  if (!orientados || orientados.length === 0) {
    tablaOrientados.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">No hay orientados registrados</td>
      </tr>
    `;
    return;
  }

  tablaOrientados.innerHTML = orientados.map((orientado) => {
    const tieneOrientador = orientado.orientadorAsignado === true;

    const estado = tieneOrientador
      ? `<span class="badge bg-success">Asignado</span>`
      : `<span class="badge bg-warning text-dark">Sin orientador</span>`;

    const nombreOrientador =
      orientado.Orientadore?.nombreApellido ||
      orientado.Orientador?.nombreApellido ||
      "Sin asignar";

    const textoBoton = tieneOrientador ? "Cambiar" : "Asignar";

    return `
      <tr>
        <td>${estado}</td>
        <td>${orientado.nombreApellido ?? "-"}</td>
        <td>${orientado.email ?? "-"}</td>
        <td>${orientado.programa ?? "-"}</td>
        <td>${nombreOrientador}</td>
        <td>
          <button
            class="btn btn-sm btn-outline-primary"
            onclick="abrirModalAsignacion(${orientado.id}, '${(orientado.nombreApellido ?? "").replace(/'/g, "\\'")}')"
            data-bs-toggle="modal"
            data-bs-target="#modalAsignarOrientador"
          >
            ${textoBoton}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}



function abrirModalAsignacion(id, nombre) {
  orientadoIdAsignar.value = id;
  nombreOrientadoAsignar.value = nombre;
  mensajeAsignacion.innerHTML = "";
}

btnBuscar.addEventListener("click", async () => {
  const nombre = inputBuscar.value.trim();

  if (!nombre) {
    obtenerOrientados();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orientados/buscar?nombre=${encodeURIComponent(nombre)}`);
    const data = await response.json();
    renderizarOrientados(data);
  } catch (error) {
    tablaOrientados.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">Error al buscar orientados</td>
      </tr>
    `;
  }
});

formAsignarOrientador.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = orientadoIdAsignar.value;
  const orientadorId = Number(selectOrientadorAsignar.value);

  try {
    const response = await fetch(`${API_URL}/orientados/${id}/asignar-orientador`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orientadorId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "No se pudo asignar el orientador");
    }

    mensajeAsignacion.innerHTML = `
      <div class="alert alert-success mb-0">
        Orientador asignado correctamente.
      </div>
    `;

    await obtenerOrientados();

  } catch (error) {
    mensajeAsignacion.innerHTML = `
      <div class="alert alert-danger mb-0">
        ${error.message}
      </div>
    `;
  }
});

formOrientado.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoOrientado = {
    nombreApellido: document.getElementById("nombreApellido").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    programa: document.getElementById("programa").value,
    foto: document.getElementById("foto").value.trim(),
    documento: document.getElementById("documento").value.trim(),
    edad: document.getElementById("edad").value ? Number(document.getElementById("edad").value) : null,
    colegio: document.getElementById("colegio").value.trim(),
    domicilio: document.getElementById("domicilio").value.trim(),
    motivo: document.getElementById("motivo").value.trim()
  };

  try {
    const response = await fetch(`${API_URL}/orientados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoOrientado)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "No se pudo guardar el orientado");
    }

    mensajeFormulario.innerHTML = `
      <div class="alert alert-success mb-0">
        Orientado guardado correctamente.
      </div>
    `;

    formOrientado.reset();
    await obtenerOrientados();

  } catch (error) {
    mensajeFormulario.innerHTML = `
      <div class="alert alert-danger mb-0">
        ${error.message}
      </div>
    `;
  }
});

obtenerOrientados();
obtenerOrientadoresParaAsignacion();