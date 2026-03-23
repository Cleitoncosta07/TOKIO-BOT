/*
 * 💰 TOKIO BOT - LA CASA DE PAPEL 💰
 * index.js ÉPICO do Professor Cleiton Costa
 * 
 * ========================================
 * 🚀 ONDE ESTÃO OS COMANDOS TOKIO? 🚀
 * ========================================
 * 📁 src/commands/
 *   ├─ admin/     👑 Comandos ADM
 *   ├─ member/    👥 Todos podem usar  
 *   └─ owner/     💰 Só Professor Cleiton!
 * 
 * ========================================
 * 🎨 MENU & FOTO TOKIO
 * ========================================
 * ✏️  Edite: src/menu.js (dentro das crases ` `)
 * 🖼️  Foto: images/tokio-bot.png OU !set-menu-image
 * 
 * ========================================
 * ⚙️  CONFIGURAÇÕES TOKIO
 * ========================================
 * 🔧 config.js  ← Prefixo ! | APIs IA | Anti-ban
 * 📱 auth/      ← Sessão WhatsApp TOKIO
 * 💾 database/  ← Users | Economy | Levels | AI
 * 
 * ========================================
 * 🚀 INICIAR ASSALTO PERFEITO
 * npm start  ← TOKIO ONLINE! 💰
 * 
 * Professor: Cleiton Costa
 * Versão: 2.0.0-💰
 * By: TOKIO TEAM
 */

import chalk from "chalk";
import { connect } from "./connection.js";
import { load } from "./loader.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import { 
  bannerLog, 
  errorLog, 
  infoLog, 
  successLog, 
  warningLog 
} from "./utils/logger.js";
import {
  BOT_NAME,
  BOT_EMOJI,
  BOT_VERSION,
  OWNER_NAME,
  PREFIX
} from "./config.js";

process.on("uncaughtException", (error) => {
  if (badMacHandler.handleError(error, "uncaughtException")) {
    return;
  }
  
  console.log(chalk.red.bold("\n💥 ERRO CRÍTICO TOKIO:\n"));
  errorLog(`❌ ${error.message}`);
  console.log(chalk.red(error.stack));
  
  if (!error.message.includes("ENOTFOUND") && !error.message.includes("timeout")) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) {
    return;
  }
  
  console.log(chalk.yellowBright("\n⚠️ PROMESSA QUEBRADA:\n"));
  errorLog(reason);
});

async function startTokio() {
  try {
    // 🔧 Configurações TOKIO
    process.setMaxListeners(1500);
    
    // 🎬 BANNER ÉPICO LA CASA DE PAPEL
    console.clear();
    console.log(chalk.bgMagenta.black.bold(`\n\n  ${BOT_EMOJI} TOKIO BOT ${BOT_VERSION} ${BOT_EMOJI}  \n\n`));
    bannerLog();
    
    console.log(chalk.cyanBright("🚀 Iniciando sistemas TOKIO...\n"));
    infoLog("🔄 Componentes internos carregando...");
    
    // 📊 Stats Anti-Ban
    const stats = badMacHandler.getStats();
    if (stats.errorCount > 0) {
      warningLog(
        `🛡️ BadMacHandler: ${stats.errorCount}/${stats.maxRetries} erros detectados`
      );
    }
    
    console.log(chalk.blueBright("\n📡 Conectando ao WhatsApp...\n"));
    const socket = await connect();
    
    console.log(chalk.greenBright("\n⚙️ Carregando comandos TOKIO...\n"));
    load(socket);
    
    // 🕐 Monitor Anti-Ban (5min)
    setInterval(() => {
      const currentStats = badMacHandler.getStats();
      if (currentStats.errorCount > 0) {
        warningLog(
          `📊 Anti-Ban TOKIO: ${currentStats.errorCount}/${currentStats.maxRetries} erros`
        );
      }
    }, 300_000);
    
    // 🎉 TOKIO PRONTO!
    console.log(chalk.bgGreen.black.bold(`\n  ✅ TOKIO ${BOT_VERSION} ONLINE! 💰  \n`));
    successLog(`🎉 ${BOT_NAME} iniciado pelo Professor ${OWNER_NAME}!`);
    console.log(chalk.yellowBright(
      `💡 Prefixo: ${PREFIX}\n` +
      `🧪 Teste: ${PREFIX}ping | ${PREFIX}menu\n` +
      `📖 Ajuda: https://github.com/Cleitoncosta07/TOKIO-BOT`
    ));
    
  } catch (error) {
    if (badMacHandler.handleError(error, "bot-startup")) {
      console.log(chalk.yellow("\n🔄 Bad MAC detectado - TOKIO reconectando...\n"));
      setTimeout(startTokio, 5000);
      return;
    }
    
    console.log(chalk.red.bold("\n💥 FALHA NO ASSALTO:\n"));
    errorLog(`❌ ${error.message}`);
    console.log(chalk.red(error.stack));
    process.exit(1);
  }
}

// 💰 INICIAR TOKIO LA CASA DE PAPEL
startTokio();