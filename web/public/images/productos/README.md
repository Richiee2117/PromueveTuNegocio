# Imágenes de Productos

Agrega las fotografías de tus productos en las carpetas correspondientes.

## Estructura de carpetas

```
productos/
  banderas-personalizadas/   — Banderas con diseño exclusivo del cliente
  banderas-catalogo/         — Banderas prefabricadas del catálogo
  carpas/                    — Carpas 3×3 y 4×4 personalizadas
  sky-dancers/               — Inflables bailarines (4m y 6m)
  estampados-bordados/       — Playeras, gorras y uniformes con logo
  promocionales/             — Tazas, plumas, llaveros y artículos
```

## Nombres de archivo esperados

Los nombres en `src/data/products.js` deben coincidir con los archivos aquí.
Ejemplo: el producto `id: 'bandera-custom'` cargará la imagen desde:

  `/images/productos/banderas-personalizadas/bandera-custom.jpg`

## Formatos recomendados

- **Formato:** JPG o WebP
- **Relación de aspecto:** 4:3 (horizontal)
- **Resolución mínima:** 800 × 600 px
- **Resolución óptima:** 1200 × 900 px
- **Peso máximo:** 200 KB por imagen (usar squoosh.app para comprimir)

## Mientras no hay imágenes

Las tarjetas de producto muestran un placeholder con el ícono de la categoría y el texto "Imagen próximamente". Esto desaparece automáticamente cuando agregas el archivo con el nombre correcto.
