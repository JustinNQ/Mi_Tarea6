const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Ana" },
];

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  if (usuarioIndex === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  usuarios[usuarioIndex].nombre = req.body.nombre;
  res.json(usuarios[usuarioIndex]);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
