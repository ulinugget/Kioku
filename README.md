# Kioku (記憶)

Aplicación web para crear y gestionar mazos de tarjetas de vocabulario japonés. Diseñada para profesores y estudiantes que buscan organizar palabras con sus lecturas, significados y oraciones de ejemplo.

## Funcionalidades

- **Autenticación** — Registro e inicio de sesión con email y contraseña. Los usuarios se registran con nombre completo, email, contraseña y rol (Profesor/Estudiante).
- **Dashboard** — Vista principal con una cuadrícula de mazos, cada uno con colores accesibles generados automáticamente (APCA) y un ícono SVG único.
- **Crear y editar mazos** — Formulario con título, título traducido, selección de idioma y un selector de 72 formas geométricas SVG como ícono.
- **Búsqueda de palabras** — Búsqueda híbrida: lista local de 25 verbos japoneses comunes + diccionario alojado en Supabase con soporte para búsquedas en kanji, kana, español e inglés.
- **Vista de mazo** — Detalle completo con lista numerada de palabras, lecturas, significados y oraciones de ejemplo.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Estilos | Tailwind CSS 4 |
| Componentes UI | Radix UI Themes |
| Rutas | React Router DOM 7 |
| Backend/Auth/DB | Supabase |
| Colores accesibles | randoma11y (APCA) |
| Iconos | Lucide React |
| Linting | Oxlint |

## Estructura del proyecto

```
src/
├── components/
│   ├── deck/          # DeckCard, DeckForm, DeckView, WordSearch, SelectedWords, ShapeIcon
│   ├── layout/        # Header
│   └── ui/            # Button, Card, Container, Dialog, Input, Select
├── contexts/          # AuthContext (session, signUp, signIn, signOut)
├── hooks/             # useDecks (CRUD de mazos)
├── lib/               # supabase.ts (cliente Supabase)
├── pages/             # Dashboard, Login, Register, NewDeck, EditDeck, DeckViewPage
├── services/          # decks.ts (CRUD), jotobaApi.ts (diccionario)
├── types/             # Tipos Deck y Word
└── utils/             # deckColors (colores accesibles), japaneseWords (lista local)
```

## Requisitos previos

- Node.js 18+
- Un proyecto de Supabase con las siguientes tablas:
  - `decks` — id, title, description, shape, bg_color, fg_color, teacher_id, created_at
  - `cards` — id, deck_id, term, definition
  - `dictionary_entries` — kanji, kana, gloss_es, gloss_en, pos, is_common

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/Kioku.git
cd Kioku

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Iniciar servidor de desarrollo
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave anónima/pública de Supabase |

## Comandos disponibles

```bash
npm run dev        # Servidor de desarrollo con HMR
npm run build      # Build de producción
npm run preview    # Previsualizar build de producción
npm run lint       # Lintear con Oxlint
```

## Rutas

| Ruta | Descripción | Protegida |
|---|---|---|
| `/login` | Inicio de sesión | No |
| `/register` | Registro de usuario | No |
| `/` | Dashboard con mazos | Sí |
| `/decks/new` | Crear nuevo mazo | Sí |
| `/decks/:id` | Ver detalles de un mazo | Sí |
| `/decks/:id/edit` | Editar mazo | Sí |
