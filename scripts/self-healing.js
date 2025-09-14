#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs/promises'
import path from 'path'

const MAX_RETRIES = 3
const REPORTS_DIR = 'reports/self-healing'
const TICKETS_DIR = 'tickets'

class SelfHealingSystem {
  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    this.reportPath = path.join(REPORTS_DIR, `${this.timestamp}.md`)
    this.ticketPath = path.join(TICKETS_DIR, 'auto-heal.md')
    this.attempts = 0
  }

  async init() {
    await this.ensureDirectories()
    console.log('🔧 Iniciando sistema de auto-reparación...')
  }

  async ensureDirectories() {
    await fs.mkdir(REPORTS_DIR, { recursive: true })
    await fs.mkdir(TICKETS_DIR, { recursive: true })
  }

  async runCommand(command, description) {
    try {
      console.log(`▶️  Ejecutando: ${description}`)
      const output = execSync(command, { 
        encoding: 'utf8',
        stdio: 'pipe'
      })
      return { success: true, output, error: null }
    } catch (error) {
      return { 
        success: false, 
        output: error.stdout || '', 
        error: error.stderr || error.message 
      }
    }
  }

  async createTicket(errors) {
    const ticket = `# Auto-Heal Ticket - ${new Date().toISOString()}

## Errores Detectados

${errors.map(error => `### ${error.stage}
\`\`\`
${error.error}
\`\`\`
`).join('\n')}

## Acciones Requeridas

- [ ] Revisar errores de compilación
- [ ] Verificar dependencias
- [ ] Ejecutar tests
- [ ] Validar configuración

## Estado

- **Creado**: ${new Date().toISOString()}
- **Intentos**: ${this.attempts}/${MAX_RETRIES}
- **Reporte**: ${this.reportPath}

## Próximos Pasos

1. design app --delta --prd ./docs/PRD.md
2. implement app --design ./design --out ./apps/portfolio
3. npm run test && npm run e2e

*Ticket generado automáticamente por el sistema de auto-reparación*
`

    await fs.writeFile(this.ticketPath, ticket)
    console.log(`📝 Ticket creado: ${this.ticketPath}`)
  }

  async createReport(results) {
    const report = `# Self-Healing Report - ${this.timestamp}

## Resumen

- **Fecha**: ${new Date().toISOString()}
- **Intentos**: ${this.attempts}/${MAX_RETRIES}
- **Estado Final**: ${results.success ? '✅ ÉXITO' : '❌ FALLO'}

## Resultados por Etapa

### Build
- **Estado**: ${results.build.success ? '✅' : '❌'}
- **Salida**: 
\`\`\`
${results.build.output}
\`\`\`
${results.build.error ? `- **Error**:\n\`\`\`\n${results.build.error}\n\`\`\`` : ''}

### Tests Unitarios
- **Estado**: ${results.test.success ? '✅' : '❌'}
- **Salida**: 
\`\`\`
${results.test.output}
\`\`\`
${results.test.error ? `- **Error**:\n\`\`\`\n${results.test.error}\n\`\`\`` : ''}

### Tests E2E
- **Estado**: ${results.e2e.success ? '✅' : '❌'}
- **Salida**: 
\`\`\`
${results.e2e.output}
\`\`\`
${results.e2e.error ? `- **Error**:\n\`\`\`\n${results.e2e.error}\n\`\`\`` : ''}

## Acciones Realizadas

${this.attempts > 1 ? `- Reintentado ${this.attempts} veces` : '- Primera ejecución'}
- Build del proyecto
- Ejecución de tests unitarios
- Ejecución de tests E2E
${results.success ? '- ✅ Todas las pruebas pasaron' : '- ❌ Se encontraron errores'}

## Próximos Pasos

${results.success ? 
  '- ✅ El proyecto está funcionando correctamente\n- 🚀 Listo para producción' : 
  '- 🔧 Revisar errores reportados\n- 📝 Consultar ticket de auto-reparación\n- 🛠️ Aplicar correcciones manuales si es necesario'
}

---
*Reporte generado automáticamente por el sistema de auto-reparación*
`

    await fs.writeFile(this.reportPath, report)
    console.log(`📊 Reporte creado: ${this.reportPath}`)
  }

  async runTests() {
    this.attempts++
    console.log(`🔄 Intento ${this.attempts}/${MAX_RETRIES}`)

    // Run build
    const buildResult = await this.runCommand('npm run build', 'Build del proyecto')
    
    // Run unit tests
    const testResult = await this.runCommand('npm run test', 'Tests unitarios')
    
    // Run E2E tests (skip if build failed)
    let e2eResult = { success: true, output: 'Omitido debido a fallo en build', error: null }
    if (buildResult.success) {
      e2eResult = await this.runCommand('npm run e2e', 'Tests E2E')
    }

    const results = {
      build: buildResult,
      test: testResult,
      e2e: e2eResult,
      success: buildResult.success && testResult.success && e2eResult.success
    }

    await this.createReport(results)

    if (!results.success) {
      const errors = []
      if (!buildResult.success) errors.push({ stage: 'Build', error: buildResult.error })
      if (!testResult.success) errors.push({ stage: 'Tests', error: testResult.error })
      if (!e2eResult.success) errors.push({ stage: 'E2E', error: e2eResult.error })
      
      await this.createTicket(errors)
      
      if (this.attempts < MAX_RETRIES) {
        console.log(`🔄 Reintentando en 5 segundos...`)
        await new Promise(resolve => setTimeout(resolve, 5000))
        return this.runTests()
      } else {
        console.log(`❌ Máximo de reintentos alcanzado (${MAX_RETRIES})`)
        console.log(`📝 Consulta el ticket: ${this.ticketPath}`)
        console.log(`📊 Consulta el reporte: ${this.reportPath}`)
        process.exit(1)
      }
    }

    console.log(`✅ Todas las pruebas pasaron en el intento ${this.attempts}`)
    console.log(`📊 Reporte disponible: ${this.reportPath}`)
    return results
  }
}

// Run self-healing if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const selfHealing = new SelfHealingSystem()
  await selfHealing.init()
  await selfHealing.runTests()
}

export { SelfHealingSystem }