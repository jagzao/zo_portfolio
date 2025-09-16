# Husky Git Hooks

## Configuración de Validación de Commits

Este proyecto usa Husky para asegurar la calidad y formato correcto de los commits.

### Hooks Configurados

#### pre-commit
- ✅ Verifica que el author sea "jagzao"
- ✅ Ejecuta TypeScript checking si está disponible
- ❌ Bloquea commits si la configuración es incorrecta

#### commit-msg
- ✅ Valida que no aparezca "jagzao and claude" en mensajes
- ✅ Verifica formato correcto de Co-Authored-By
- ❌ Bloquea commits con formato incorrecto

### Configuración Requerida

```bash
# Configurar nombre de usuario correcto
git config user.name "jagzao"
git config user.email "jagzao@gmail.com"
```

### Formato Correcto de Commits

```
feat: Add new feature

Description of the change.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Errores Comunes Bloqueados

❌ **Incorrecto:**
- `jagzao and claude` en commits
- Co-Authored-By con ambos nombres
- Author name diferente a "jagzao"

✅ **Correcto:**
- Solo "jagzao" como author
- Co-Authored-By: Claude <noreply@anthropic.com>