/**
 * 🚀 TOKIO BOT - LA CASA DE PAPEL 💰
 * Inicialização ÉPICA do Professor
 * 
 * Conecta o TOKIO ao WhatsApp com estilo
 * Anti-ban + reconexão automática
 * 
 * @author Cleiton Costa
 * @version 2.0.0-💰
 */

import makeWASocket, {
  DisconnectReason,
  isJidBroadcast,
  isJidNewsletter,
  isJidStatusBroadcast,
  useMultiFileAuthState,
} from "baileys";
import NodeCache from "node-cache";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";

import { 
  PREFIX, 
  TEMP_DIR, 
  WAWEB_VERSION, 
  BOT_NAME, 
  BOT_EMOJI,
  BOT_VERSION,
  OWNER_NAME
} from "./config.js";
import { load } from "./loader.js";
import { badMacHandler } from "./utils/badMacHandler.js";
import { onlyNumbers, question } from "./utils/index.js";
import {
  bannerLog,
  errorLog,
  infoLog,
  successLog,
  warningLog,
} from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const logger = pino(
  { timestamp: () => `,"time":"${new Date().toJSON()}"` },
  pino.destination(path.join(TEMP_DIR, "tokio-logs.txt")),
);

logger.level = "error";
const msgRetryCounterCache = new NodeCache();

function formatPairingCode(code) {
  if (!code) return code;
  return code?.match(/.{1,4}/g)?.join("-") || code;
}

function clearScreenWithBanner() {
  console.clear();
  bannerLog();
}

export async function connect() {
  // 📁 Pasta TOKIO auth (La Casa de Papel style)
  const baileysFolder = path.resolve(
    __dirname,
    "..",
    "auth",
    "baileys"
  );

  const { state, saveCreds } = await useMultiFileAuthState(baileysFolder);

  const socket = makeWASocket({
    version: WAWEB_VERSION,
    logger,
    defaultQueryTimeoutMs: undefined,
    retryRequestDelayMs: 5000,
    auth: state,
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    connectTimeoutMs: 20_000,
    keepAliveIntervalMs: 30_000,
    maxMsgRetryCount: 5,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    emitOwnEvents: false,
    msgRetryCounterCache,
    shouldSyncHistoryMessage: () => false,
  });

  if (!socket.authState.creds.registered) {
    clearScreenWithBanner();
    console.log(
      chalk.yellow(`📱 ${BOT_EMOJI} TOKIO precisa parear!\n`),
      chalk.cyan('Exemplo SP/RJ: "+5511912345678"'),
      chalk.gray('Demais estados: "+554112345678"'),
    );

    const phoneNumber = await question(chalk.green.bold("💰 Número TOKIO: "));

    if (!phoneNumber) {
      errorLog("❌ Número inválido! Execute: npm start");
      process.exit(1);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));
    console.log(chalk.magentaBright(`🔑 Código TOKIO: ${formatPairingCode(code)}`));
    console.log(chalk.yellow("📲 Escaneie no WhatsApp > Dispositivos vinculados"));
  }

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const error = lastDisconnect?.error;
      const statusCode = error?.output?.statusCode;

      // 🛡️ Bad MAC Handler (Anti-ban TOKIO)
      if (error?.message?.includes("Bad MAC") || error?.toString()?.includes("Bad MAC")) {
        errorLog("🔒 Bad MAC detectado - TOKIO em ação!");
        if (badMacHandler.handleError(error, "connection.update")) {
          if (badMacHandler.hasReachedLimit()) {
            warningLog("💥 Limite Bad MAC! Limpando sessão...");
            badMacHandler.clearProblematicSessionFiles();
            badMacHandler.resetErrorCount();
            const newSocket = await connect();
            load(newSocket);
            return;
          }
        }
      }

      // 📊 Status Codes TOKIO
      switch (statusCode) {
        case DisconnectReason.loggedOut:
          errorLog("🚫 TOKIO desconectado manualmente!");
          break;
        case DisconnectReason.badSession:
          warningLog("🔄 Sessão corrompida - Reconectando...");
          if (badMacHandler.handleError(new Error("Bad session"), "badSession")) {
            if (badMacHandler.hasReachedLimit()) {
              warningLog("🧹 Sessão limpa! Reiniciando...");
              badMacHandler.clearProblematicSessionFiles();
              badMacHandler.resetErrorCount();
            }
          }
          break;
        case DisconnectReason.connectionClosed:
          warningLog("🔌 Conexão fechada");
          break;
        case DisconnectReason.connectionLost:
          warningLog("📡 Sinal perdido");
          break;
        case DisconnectReason.connectionReplaced:
          warningLog("🔀 Conexão substituída");
          break;
        case DisconnectReason.multideviceMismatch:
          warningLog("📱 Dispositivo incompatível");
          break;
        case DisconnectReason.forbidden:
          warningLog("🚫 WhatsApp bloqueou");
          break;
        case DisconnectReason.restartRequired:
          infoLog('🔄 Reiniciar: "npm start"');
          break;
        case DisconnectReason.unavailableService:
          warningLog("🌐 WhatsApp indisponível");
          break;
        default:
          infoLog("🔄 Reconectando em 3s...");
      }

      const newSocket = await connect();
      load(newSocket);
    } 
    else if (connection === "open") {
      clearScreenWithBanner();
      
      // 🎉 TOKIO ONLINE - LA CASA DE PAPEL STYLE
      console.log(chalk.bgMagenta.black.bold(`\n  ${BOT_EMOJI} TOKIO ${BOT_VERSION} ${BOT_EMOJI}  \n`));
      successLog(`✅ ${BOT_NAME} iniciado pelo Professor ${OWNER_NAME}!`);
      successLog("💰 Conectado ao WhatsApp Web v" + WAWEB_VERSION.join("."));
      successLog("🚀 Anti-ban ativo | Reconexão automática");
      
      console.log(chalk.green.bold(`\n📋 COMANDOS PRONTOS!\nPrefixo: ${PREFIX}\nTeste: ${PREFIX}menu ou "${PREFIX}ping"\n`));
      
      badMacHandler.resetErrorCount();
    } 
    else if (connection === "connecting") {
      infoLog("🔄 TOKIO conectando...");
    } 
    else {
      infoLog("📡 Sincronizando...");
    }
  });

  socket.ev.on("creds.update", saveCreds);
  return socket;
}
