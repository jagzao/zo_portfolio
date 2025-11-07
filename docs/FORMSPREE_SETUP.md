# Formspree Setup - Formulario de Contacto Gratis

## ¿Qué es Formspree?

Formspree es un servicio que te permite tener formularios de contacto funcionales sin necesidad de un backend. **100% gratis** hasta 50 submissions al mes.

## Características del Plan Gratuito

✅ **50 submissions/mes** - Más que suficiente para un portfolio
✅ **Spam protection** - Filtrado automático
✅ **Email notifications** - Recibes email con cada mensaje
✅ **No branding** - Sin logos de Formspree en los emails
✅ **AJAX support** - Integración suave sin recargar página
✅ **File uploads** - Hasta 10MB por archivo (opcional)
✅ **Autoresponder** - Email automático al usuario (opcional)

## Pasos de Configuración (5 minutos)

### 1. Crear Cuenta

1. Ve a https://formspree.io/
2. Click en **"Get Started"**
3. Registrate con:
   - Email: jagzao@gmail.com
   - Contraseña segura

### 2. Crear Formulario

1. En el dashboard, click **"+ New Form"**
2. Configura:
   - **Name**: Portfolio Contact Form
   - **Email**: jagzao@gmail.com (donde recibirás los mensajes)
3. Click **"Create Form"**

### 3. Obtener Form ID

Formspree te mostrará un **Form ID** único:

```
https://formspree.io/f/xyzw1234
```

El Form ID es: `xyzw1234`

### 4. Configurar en el Proyecto

Edita tu archivo `.env`:

```bash
VITE_FORMSPREE_ID=xyzw1234
```

En Cloudflare Pages, agrega la misma variable:
- Settings → Environment Variables
- Nombre: `VITE_FORMSPREE_ID`
- Valor: `xyzw1234`

### 5. Redeploy

```bash
git add .
git commit -m "feat: Configure Formspree contact form"
git push
```

Cloudflare Pages rebuildeará automáticamente.

### 6. Probar el Formulario

1. Ve a tu sitio: https://zo-portfolio.pages.dev/contact
2. Llena el formulario
3. Envía un mensaje de prueba
4. Deberías recibir un email en jagzao@gmail.com

## Configuración Avanzada (Opcional)

### Autoresponder

Para enviar un email automático al usuario:

1. En Formspree dashboard → Tu form → Settings
2. Habilita **"Autoresponder"**
3. Personaliza el mensaje:

```
¡Gracias por contactarme!

He recibido tu mensaje y te responderé pronto.

Saludos,
Juan Zambrano
```

### Spam Protection

Formspree incluye:
- ✅ **Honeypot field** - Campo oculto para bots
- ✅ **reCAPTCHA** (opcional) - Protección extra
- ✅ **Rate limiting** - Previene abuso

### Notificaciones Personalizadas

Puedes personalizar el asunto del email en el código:

```typescript
body: JSON.stringify({
  name: form.name,
  email: form.email,
  message: form.message,
  _subject: `Portfolio Contact: ${form.name}`,
  _replyto: form.email, // Para responder directamente
})
```

## Monitoreo

### Ver Submissions

1. Dashboard de Formspree
2. Click en tu form
3. Pestaña **"Submissions"**
4. Verás todos los mensajes recibidos

### Exportar Datos

- Click en **"Export"**
- Descarga en CSV o JSON
- Backup de todos los mensajes

## Límites y Escalabilidad

### Plan Gratis
- ✅ 50 submissions/mes
- ✅ Suficiente para portfolio personal
- ✅ Sin límite de forms

### Si Necesitas Más (Futuro)
- **Gold Plan**: $10/mes → 1,000 submissions
- **Platinum Plan**: $40/mes → 10,000 submissions

Pero con 50/mes es más que suficiente.

## Alternativas (También Gratis)

Si Formspree no te convence:

### 1. Web3Forms
- 250 submissions/mes gratis
- Setup similar a Formspree
- https://web3forms.com/

### 2. FormSubmit
- Submissions ilimitados
- Más básico (solo envía email)
- https://formsubmit.co/

### 3. Getform
- 50 submissions/mes
- Interface más simple
- https://getform.io/

## Troubleshooting

### No recibo emails

1. **Verifica spam**: Revisa carpeta de spam
2. **Email correcto**: Chequea el email en Formspree dashboard
3. **Form ID**: Verifica que el Form ID sea correcto
4. **Variable de entorno**: Confirma que `VITE_FORMSPREE_ID` esté configurada

### Error 404

- Form ID incorrecto
- Verifica el ID en Formspree dashboard

### Error 429 (Too Many Requests)

- Alcanzaste el límite de 50/mes
- Espera al próximo mes o upgrade

## Seguridad

### Protección contra Spam

Formspree incluye:
- Honeypot field (invisible para usuarios reales)
- Rate limiting automático
- Detección de patrones de spam

### Datos Privados

- ✅ Formspree no vende tus datos
- ✅ GDPR compliant
- ✅ Datos encriptados en tránsito (HTTPS)

## Coste Total

**$0.00 USD/mes** ✅

Sin costes ocultos, sin tarjetas de crédito requeridas.

## Resumen

| Característica | Plan Gratis |
|---------------|-------------|
| Submissions | 50/mes |
| Spam filter | ✅ Incluido |
| Email notifications | ✅ Incluido |
| Autoresponder | ✅ Incluido |
| File uploads | ✅ 10MB/archivo |
| SSL/HTTPS | ✅ Incluido |
| Coste | **$0.00** |

Perfecto para portfolios personales. 🚀
