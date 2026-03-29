const tablaEventos = document.getElementById("tablaEventos");
const formEvento = document.getElementById("formEvento");
const mensajeEvento = document.getElementById("mensajeEvento");
const listaOrientados = document.getElementById("listaOrientados");
const selectOrientador = document.getElementById("orientadorId");
const filtroOrientado = document.getElementById("filtroOrientado");
const btnLimpiarFiltro = document.getElementById("btnLimpiarFiltro");

let eventosGlobal = [];

async function obtenerOrientadores() {

  try {

    const response = await fetch(`${API_URL}/orientadores`);
    const orientadores = await response.json();

    const selectOrientador = document.getElementById("orientadorId");

    selectOrientador.innerHTML = `
      <option value="">Seleccionar orientador</option>
      ${orientadores.map(o => `
        <option value="${o.id}">
          ${o.nombreApellido}
        </option>
      `).join("")}
    `;

  } catch (error) {
    console.error("Error al cargar orientadores:", error);
  }

}

async function obtenerOrientadosParaEvento() {
  try {
    const response = await fetch(`${API_URL}/orientados`);
    const orientados = await response.json();

    listaOrientados.innerHTML = orientados.map(orientado => `
      <div class="form-check">
        <input class="form-check-input orientado-checkbox"
          type="checkbox"
          value="${orientado.id}"
          id="orientado-${orientado.id}">
          
        <label class="form-check-label" for="orientado-${orientado.id}">
          ${orientado.nombreApellido}
        </label>
      </div>
    `).join("");

    filtroOrientado.innerHTML = `
      <option value="">Todos los orientados</option>
      ${orientados.map(orientado => `
        <option value="${orientado.id}">
          ${orientado.nombreApellido}
        </option>
      `).join("")}
    `;

  } catch (error) {
    console.error("Error al cargar orientados:", error);
  }
}

function inicializarFiltros() {
  filtroOrientado.addEventListener("change", () => {
    const orientadoIdSeleccionado = Number(filtroOrientado.value);

    if (!orientadoIdSeleccionado) {
      renderizarEventos(eventosGlobal);
      return;
    }

    const eventosFiltrados = eventosGlobal.filter(evento =>
      evento.Orientados &&
      evento.Orientados.some(orientado => orientado.id === orientadoIdSeleccionado)
    );

    renderizarEventos(eventosFiltrados);
  });

  btnLimpiarFiltro.addEventListener("click", () => {
    filtroOrientado.value = "";
    renderizarEventos(eventosGlobal);
  });
}

async function obtenerEventos() {
  try {
    const response = await fetch(`${API_URL}/eventos`);
    const eventos = await response.json();
    eventosGlobal = eventos;
    renderizarEventos(eventosGlobal);
  } catch (error) {
    tablaEventos.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-danger">Error al cargar eventos</td>
      </tr>
    `;
  }
}

function renderizarEventos(eventos) {

  if (!eventos || eventos.length === 0) {
    tablaEventos.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted">No hay eventos registrados</td>
      </tr>
    `;
    return;
  }

  tablaEventos.innerHTML = eventos.map(evento => {
    const nombreOrientador =
      evento.Orientadore?.nombreApellido ||
      evento.Orientador?.nombreApellido ||
      "Sin orientador";

    const orientadosParticipantes =
      evento.Orientados && evento.Orientados.length > 0
        ? evento.Orientados.map(o => o.nombreApellido).join(", ")
        : "Sin orientados";

    return `
      <tr>
        <td>${evento.nombreEvento ?? "-"}</td>
        <td>${evento.fecha ?? "-"}</td>
        <td>${evento.hora ?? "-"}</td>
        <td>${evento.duracion ?? "-"} min</td>
        <td>${nombreOrientador}</td>
        <td>${orientadosParticipantes}</td>
        <td>${evento.detalle ?? "-"}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarEvento(${evento.id})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

formEvento.addEventListener("submit", async (e) => {
  e.preventDefault();
  const orientadosSeleccionados = Array.from(
  document.querySelectorAll(".orientado-checkbox:checked")
  ).map(check => Number(check.value));
  
  const nuevoEvento = {
      nombreEvento: document.getElementById("nombreEvento").value.trim(),
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      duracion: Number(document.getElementById("duracion").value),
      detalle: document.getElementById("detalle").value.trim(),
      orientadorId: Number(document.getElementById("orientadorId").value),
      orientadosIds: orientadosSeleccionados
    };

  try {
    const response = await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoEvento)
    });

    const data = await response.json();
    


    if (!response.ok) {
      throw new Error(data.error || "No se pudo crear el evento");
    }

    mensajeEvento.innerHTML = `
      <div class="alert alert-success mb-0">
        Evento creado correctamente.
      </div>
    `;

    formEvento.reset();
    await obtenerEventos();

  } catch (error) {
    mensajeEvento.innerHTML = `
      <div class="alert alert-danger mb-0">
        ${error.message}
      </div>
    `;
  }
});

async function eliminarEvento(id) {
  const confirmar = confirm("¿Seguro que querés eliminar este evento?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/eventos/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "No se pudo eliminar el evento");
    }

    await obtenerEventos();

  } catch (error) {
    alert(error.message);
  }
}

obtenerEventos();
obtenerOrientadores();
obtenerOrientadosParaEvento();
inicializarFiltros();
