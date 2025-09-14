import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("✨ Iniciando orchestrator para Zo_Portfolio...");

try {
  // 1. Leer documentación
  console.log("📚 Leyendo documentación...");
  
  const docsToRead = [
    "./docs/PRD.md",
    "./docs/ARCHITECTURE.md", 
    "./docs/TESTING.md"
  ];
  
  for (const docPath of docsToRead) {
    if (fs.existsSync(docPath)) {
      console.log(`  ✓ ${docPath} encontrado`);
    } else {
      console.log(`  ⚠️  ${docPath} no encontrado`);
    }
  }
  
  // 2. Detectar tickets
  console.log("🔍 Detectando tickets...");
  const ticketsDir = "./tickets";
  let hasTickets = false;
  
  if (fs.existsSync(ticketsDir)) {
    const tickets = fs.readdirSync(ticketsDir);
    hasTickets = tickets.length > 0;
    
    if (hasTickets) {
      console.log(`🎫 ${tickets.length} tickets detectados`);
    } else {
      console.log("📝 No hay tickets existentes");
    }
  } else {
    console.log("📝 Directorio de tickets no existe");
  }
  
  // 3. Ejecutar comando design
  console.log("🎨 Ejecutando diseño...");
  
  let designCommand;
  if (hasTickets) {
    designCommand = "design app --delta --prd ./docs/PRD.md";
  } else {
    designCommand = "design app --prd ./docs/PRD.md";
  }
  
  console.log(`  📋 Comando: ${designCommand}`);
  execSync(designCommand, { stdio: "inherit" });
  console.log("✅ Diseño completado");
  
  // 4. Ejecutar implementación
  console.log("⚙️ Ejecutando implementación...");
  const implementCommand = "implement app --design ./design --out ./apps/portfolio";
  console.log(`  📋 Comando: ${implementCommand}`);
  execSync(implementCommand, { stdio: "inherit" });
  console.log("✅ Implementación completada");
  
  // 5. Ejecutar tests
  console.log("🧪 Ejecutando tests...");
  try {
    execSync("npm run test && npm run e2e", { stdio: "inherit" });
    console.log("✅ Tests completados exitosamente");
  } catch (testError) {
    console.log("❌ Tests fallaron, ejecutando self-healing...");
    try {
      execSync("node ./scripts/self-healing.js", { stdio: "inherit" });
      console.log("🔧 Self-healing ejecutado");
    } catch (healingError) {
      console.log("❌ Error en self-healing:", healingError.message);
      throw healingError;
    }
  }
  
  console.log("🎉 Orchestrator completado exitosamente");
  
} catch (error) {
  console.log("❌ Error en orchestrator:", error.message);
  process.exit(1);
}