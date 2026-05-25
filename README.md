"# Federico-Sustaita-Fuentes-Tp2-com3" 
# TP N2 - Task Manager

Aplicación de lista de tareas desarrollada con HTML, CSS, JavaScript Vanilla y JSON Server.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- JSON Server

---

# Funcionalidades

- Mostrar tareas
- Agregar tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Filtrar tareas:
  - Todas
  - Pendientes
  - Completadas

---

# Estructura del proyecto

```txt
/trabajoPracticoN2com3
│
├── index.html
├── db.json
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
└── README.md
```

---

# Instalación

## 1. Instalar JSON Server

Abrir la terminal y ejecutar:

```bash
npm install -g json-server
```

---

## 2. Ejecutar JSON Server

Dentro de la carpeta del proyecto ejecutar:

```bash
json-server --watch db.json --port 3000
```

El servidor se ejecutará en:

```txt
http://localhost:3000
```
