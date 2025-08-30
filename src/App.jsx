import React from 'react'

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, Arial', padding: '24px', maxWidth: 960, margin: '0 auto' }}>
      <h1>🛒 Catálogo Interactivo de Productos</h1>
      <p>
        Bienvenidos. Este es el punto de partida del proyecto final. 
        Aquí documentare y construire el catálogo paso a paso.
      </p>
      <ul>
        <li>Listado de productos (mock data)</li>
        <li>Búsqueda y filtros</li>
        <li>Favoritos / Carrito (estado global)</li>
        <li>Detalle de producto (ruta dinámica)</li>
        <li>Despliegue en Vercel</li>
      </ul>
    </main>
  )
}
