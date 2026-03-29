exports.obtenerNovedades = (req, res) => {
  //traer novedades de la base de datos
  const novedades = [
    {
      id: 1,
      titulo: "Inscripción abierta a orientación vocacional",
      descripcion: "Se encuentra habilitada la inscripción para nuevos orientados en el programa de orientación vocacional."
    },
    {
      id: 2,
      titulo: "Nuevos talleres de matemáticas",
      descripcion: "Se incorporaron nuevos turnos para los talleres de apoyo en matemáticas."
    },
    {
      id: 3,
      titulo: "Jornada de acompañamiento académico",
      descripcion: "La academia realizará una jornada especial con orientadores para el seguimiento de estudiantes."
    }
  ];

  res.json(novedades);
};
