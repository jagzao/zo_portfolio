# Cloudflare Web Analytics Setup (100% Gratis)

## ¿Qué es Cloudflare Web Analytics?

Cloudflare Web Analytics es una solución de analytics **completamente gratuita** que:
- ✅ No usa cookies
- ✅ 100% privacidad del usuario (GDPR compliant)
- ✅ Sin límite de pageviews
- ✅ Sin coste alguno
- ✅ Muy ligero (< 10KB)

## Pasos de Configuración

### 1. Crear Cuenta en Cloudflare (Gratis)

1. Ve a https://dash.cloudflare.com/sign-up
2. Crea una cuenta gratuita (solo email y contraseña)
3. No necesitas agregar un dominio todavía

### 2. Habilitar Web Analytics

1. En el dashboard de Cloudflare, ve a la sección **"Analytics & Logs"**
2. Click en **"Web Analytics"**
3. Click en **"Add a site"**
4. Ingresa tu dominio: `zo-portfolio.pages.dev`
5. Click en **"Begin setup"**

### 3. Obtener el Token

Cloudflare te mostrará un snippet como este:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "abc123xyz456"}'></script>
```

**Copia solo el token** (la parte `abc123xyz456`)

### 4. Configurar en el Proyecto

1. Edita tu archivo `.env`:
   ```bash
   VITE_CLOUDFLARE_ANALYTICS_TOKEN=abc123xyz456
   VITE_ENABLE_ANALYTICS=true
   ```

2. En Cloudflare Pages, agrega las mismas variables:
   - Ve a tu proyecto en Cloudflare Pages
   - Settings → Environment Variables
   - Agrega: `VITE_CLOUDFLARE_ANALYTICS_TOKEN` con tu token
   - Agrega: `VITE_ENABLE_ANALYTICS` con valor `true`

3. Redeploy tu sitio

### 5. Verificar Funcionamiento

1. Visita tu sitio: https://zo-portfolio.pages.dev
2. Abre DevTools → Network tab
3. Busca una petición a `cloudflareinsights.com/beacon.min.js`
4. Si aparece, ¡está funcionando! ✅

### 6. Ver Analytics

1. Ve a Cloudflare Dashboard → Web Analytics
2. Verás métricas como:
   - Page views
   - Unique visitors
   - Core Web Vitals
   - Bounce rate
   - Top pages
   - Referrers
   - Device types
   - Browsers

## Qué Mide (Sin Cookies)

- ✅ Page views totales
- ✅ Visitantes únicos (sin identificar)
- ✅ Core Web Vitals (performance)
- ✅ Tiempo en página
- ✅ Bounce rate
- ✅ Navegador y dispositivo (anónimo)
- ✅ País (anónimo)

## Qué NO Hace

- ❌ No rastrea usuarios individuales
- ❌ No usa cookies
- ❌ No comparte datos con terceros
- ❌ No tiene coste alguno
- ❌ No tiene límites

## Ventajas vs Google Analytics

| Característica | Cloudflare | Google Analytics |
|---------------|------------|------------------|
| Coste | **Gratis** | Gratis |
| Privacidad | **Excelente** | Regular |
| GDPR | **Compliant** | Requiere banner |
| Cookies | **No usa** | Usa cookies |
| Peso | **< 10KB** | ~45KB |
| Límites | **Ninguno** | Ninguno |
| Setup | **Muy fácil** | Complejo |

## Troubleshooting

### No veo datos

1. Verifica que el token sea correcto
2. Asegúrate de que `VITE_ENABLE_ANALYTICS=true`
3. Limpia cache del navegador
4. Espera 5-10 minutos para ver primeros datos

### Script no carga

1. Verifica que el componente `<Analytics />` esté en `App.tsx`
2. Chequea la consola del navegador por errores
3. Verifica que el token esté en variables de entorno

## Coste Total

**$0.00 USD** ✅

Sin costes ocultos, sin límites, sin suscripciones.
