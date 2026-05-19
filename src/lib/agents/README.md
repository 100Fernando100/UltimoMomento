# Agentes por país — RompeNoticias

Esta carpeta define **perfiles de redacción satírica por país**. Cada perfil
encapsula tono, voz, modismos, vocabulario local, temas sensibles, ejemplos y
reglas de escritura. La utilidad `buildPrompt(country, news)` arma el prompt
que un LLM (Claude, GPT, etc.) debe recibir para generar título + bajada con
sabor local.

## Estructura

```
src/lib/agents/
├── README.md              ← este archivo
├── types.ts               ← tipos compartidos (CountryProfile, NewsInput…)
├── index.ts               ← API pública: getCountryProfile, buildPrompt, …
└── countries/
    ├── index.ts           ← registro de perfiles
    ├── ar.ts              ← Argentina (es-AR)
    ├── mx.ts              ← México   (es-MX)
    ├── es.ts              ← España   (es-ES)
    ├── co.ts              ← Colombia (es-CO)
    └── cl.ts              ← Chile    (es-CL)
```

## Países soportados

| Code | Locale | Bandera |
|------|--------|---------|
| AR   | es-AR  | 🇦🇷 |
| MX   | es-MX  | 🇲🇽 |
| ES   | es-ES  | 🇪🇸 |
| CO   | es-CO  | 🇨🇴 |
| CL   | es-CL  | 🇨🇱 |

## API pública

```ts
import {
  getCountryProfile,
  buildPrompt,
  buildSystemPrompt,
  normalizeCountry,
  supportedCountries,
  countryProfiles,
} from './lib/agents';

// Normaliza "ar", "AR", "es-AR" → "AR"
const code = normalizeCountry('es-AR'); // 'AR'

// Perfil completo del país
const profile = getCountryProfile('MX');

// Prompt completo listo para mandar al LLM
const prompt = buildPrompt('AR', {
  title: 'Suben otra vez los precios en supermercados',
  description: 'Según relevamientos, la canasta básica…',
  link: 'https://fuente.example/nota',
});
```

`buildPrompt` devuelve un string único que incluye:

1. El **system prompt** específico del país (tono, voz, modismos, reglas, temas
   sensibles, ejemplos).
2. La **noticia original** (título, resumen, país, URL).
3. La **tarea** y el **esquema JSON** exacto que el modelo debe devolver,
   compatible con el shape actual de los nodos `Build prompts` / `Process
   response` del workflow n8n.

## Cómo conectarlo desde n8n

El workflow `rompnoticias-n8n-workflow.json` actualmente usa un único prompt
hardcoded en el nodo `Build prompts`. Hay tres formas de integrar estos
perfiles, de menor a mayor acoplamiento:

### Opción A — Reescribir el nodo "Build prompts" (recomendada)

Reemplazar el `jsCode` del nodo `Build prompts` por una versión que importe los
perfiles. Si tu instancia n8n permite módulos externos (Self-hosted con
`NODE_FUNCTION_ALLOW_EXTERNAL`), podés `require`-ear un bundle compilado de
`src/lib/agents`. Si no, copiá el contenido de `countries/<code>.ts` como
objeto literal dentro del nodo Code, junto con `buildPrompt`.

Ejemplo mínimo del nodo Code:

```js
// Pegar aquí el contenido de src/lib/agents/countries/* serializado
const profiles = {
  AR: { /* … */ },
  MX: { /* … */ },
  ES: { /* … */ },
  CO: { /* … */ },
  CL: { /* … */ },
};

const item = $input.first().json;
const country = (item.country || 'AR').toUpperCase();
const profile = profiles[country] || profiles.AR;

// … construir el prompt con la misma lógica que buildPrompt()
```

Workflow complementario ya provisto: `rompnoticias-n8n-workflow-multipais.json`
en la raíz del repo. Incluye el ruteo por `country` (AR/MX/ES/CO/CL) y un nodo
Code que ya trae los 5 perfiles inline.

### Opción B — Exponer un endpoint HTTP

Si más adelante se monta un backend (por ejemplo una Edge Function de
Supabase), exponer:

```
GET /agents/prompt?country=AR&title=...&description=...&link=...
→ { prompt: "…", country: "AR", locale: "es-AR" }
```

El nodo `HTTP Request` de n8n consume eso y pasa `prompt` al modelo.

### Opción C — Importar como módulo ESM

En setups con n8n + workflows tipo `code` que soportan import dinámico, se
puede `import('…/agents/index.js')`. Requiere build previo del paquete.

## Cómo extender a un país nuevo

1. Agregá el archivo `src/lib/agents/countries/<code>.ts` siguiendo el shape
   de `CountryProfile` (ver `types.ts`).
2. Agregalo al union `CountryCode` y al map `localeToCode` en
   `src/lib/agents/types.ts` y `src/lib/agents/index.ts`.
3. Registralo en `countryProfiles` y `supportedCountries` en
   `src/lib/agents/countries/index.ts`.
4. (Opcional) Sumá la edición al componente `src/components/CountryBar.tsx` si
   debe aparecer en la UI.
5. (Opcional) Sumá una rama en `rompnoticias-n8n-workflow-multipais.json` con
   su feed RSS y nodo Set `country`.

## Decisiones de diseño

- **Sin dependencias externas.** Solo TypeScript puro; el código corre tanto
  en el frontend (Vite) como pegado dentro de un nodo Code de n8n.
- **Temas sensibles explícitos por país.** No se ironiza con víctimas; sátira
  apunta al poder, no al damnificado.
- **Salida JSON compatible** con el shape actual de Supabase (`articles`) para
  no romper el insert existente del workflow.
- **`country` y `locale`** se agregan al JSON de salida para permitir que el
  frontend filtre por edición.
