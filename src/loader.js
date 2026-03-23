/**
 * 🚀 TOKIO BOT - LOADER ÉPICO 💰
 * Carrega eventos WhatsApp com ANTI-BAN
 * La Casa de Papel: Assalto Perfeito aos Eventos!
 * 
 * @author Professor Cleiton Costa
 * @version 2.0.0-💰
 */

import { 
  TIMEOUT_IN_MILLISECONDS_BY_EVENT, 
  BOT_NAME, 
  BOT_EMOJI 
} from "./config.js";
import { onMessagesUpsert } from "./middlewares/onMessagesUpsert.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import { errorLog, infoLog } from "./utils/logger.js";

export function load(socket) {
  infoLog(`🔄 ${BOT_EMOJI} TOKIO carregando eventos...`);

  // 🛡️ Event Handler TOKIO (Anti-crash)
  const safeEventHandler = async (callback, data, eventName) => {
    try {
      await callback(data);
    } catch (error) {
      if (badMacHandler.handleError(error, eventName)) {
        infoLog(`🛡️ Bad MAC bloqueado: ${eventName}`);
        return;
      }
      
      console.log(`\n💥 ERRO ${eventName.toUpperCase()}:\n`);
      errorLog(`❌ ${error.message}`);
      if (error.stack) errorLog(`📚 Stack: ${error.stack}`);
    }
  };

  // 📨 MESSAGES.UPSERT - CÉREBRO DO TOKIO
  socket.ev.on("messages.upsert", async (data) => {
    const startProcess = Date.now();
    
    // ⏱️ Anti-Ban Delay (TOKIO Style)
    setTimeout(() => {
      safeEventHandler(
        () => onMessagesUpsert({
          socket,
          messages: data.messages,
          startProcess,
        }),
        data,
        "messages.upsert"
      );
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });

  // 🌐 PROCESS ERROR HANDLERS (Duplo Proteção)
  process.on("uncaughtException", (error) => {
    if (badMacHandler.handleError(error, "uncaughtException")) return;
    errorLog(`💥 CRASH GLOBAL: ${error.message}`);
  });

  process.on("unhandledRejection", (reason) => {
    if (badMacHandler.handleError(reason, "unhandledRejection")) return;
    errorLog(`🔒 PROMESSA QUEBRADA: ${reason}`);
  });

  infoLog(`✅ ${BOT_NAME} eventos carregados!`);
  console.log(`💰 TOKIO ${BOT_EMOJI} PROCESSANDO MENSAGENS...\n`);
}
