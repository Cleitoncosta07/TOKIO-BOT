import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prefixo customizado TOKIO.
export const PREFIX = "!";

// Emoji épico TOKIO LA CASA DE PAPEL 💰.
export const BOT_EMOJI = "💰";

// Nome lendário do bot.
export const BOT_NAME = "TOKIO";

// LID do bot (atualize com !lid).
export const BOT_LID = "12345678901234567890@lid";

// LID do dono Cleiton Costa (use !meu-lid para confirmar).
export const OWNER_LID = "5513996491230@s.whatsapp.net";

// Diretório dos comandos.
export const COMMANDS_DIR = path.join(__dirname, "..", "src", "commands");

// Diretório de banco de dados JSON.
export const DATABASE_DIR = path.resolve(__dirname, "..", "database");

// Diretório de assets (sons, vídeos, imagens).
export const ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Diretório de imagens e mascote.
export const IMAGES_DIR = path.resolve(__dirname, "..", "images");

// Diretório de GIFs e memes.
export const FUNNY_DIR = path.resolve(__dirname, "..", "funny");

// Diretório de arquivos temporários/cache.
export const TEMP_DIR = path.resolve(__dirname, "..", "temp");

// Diretório de samples de teste.
export const SAMPLES_DIR = path.resolve(__dirname, "..", "samples");

// Timeout otimizado por evento (anti-ban).
export const TIMEOUT_IN_MILLISECONDS_BY_EVENT = 800;

// Plataforma SPIDER API 💰.
export const SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";
export const SPIDER_API_TOKEN = "seu_token_aqui";

// Linker para imagens → links.
export const LINKER_BASE_URL = "https://linker.devgui.dev/api";
export const LINKER_API_KEY = "seu_token_aqui";

// Grupo exclusivo (deixe vazio para todos | use !get-group-id).
export const ONLY_GROUP_ID = "";

// Modo dev: logs detalhados de mensagens.
export const DEVELOPER_MODE = false;

// Proxy (preencha se necessário).
export const PROXY_PROTOCOL = "http";
export const PROXY_HOST = "";
export const PROXY_PORT = "";
export const PROXY_USERNAME = "";
export const PROXY_PASSWORD = "";

// WhatsApp Web version estável 💰.
export const WAWEB_VERSION = [2, 3000, 1035691214];

// TOKIO IA APIs - Chaves para superpotências LA CASA DE PAPEL!

// OpenAI GPT-4o (comandos IA elite).
export const OPENAI_API_KEY = "";

// Gemini 2.0 Flash (respostas rápidas 💰).
export const GEMINI_API_KEY = "";

// Claude 3.5 Sonnet (análises profundas).
export const CLAUDE_API_KEY = "";

// Grok API (humor e criatividade máxima).
export const GROK_API_KEY = "";

// Economia & Levels ativados (estilo assalto perfeito).
export const ECONOMY_ENABLED = true;
export const LEVELS_ENABLED = true;

// Menu interativo ativado (painel professor).
export const INTERACTIVE_MENU = true;

// Anti-spam: max mensagens/segundo por user.
export const ANTI_SPAM_LIMIT = 5;

// Logs avançados (salva em database/logs.json).
export const ADVANCED_LOGGING = true;

// Easter egg TOKIO ativado 💰.
export const EASTER_EGG_ENABLED = true;

// Dono oficial.
export const OWNER_NAME = "Cleiton Costa";

// Versão TOKIO LA CASA DE PAPEL.
export const BOT_VERSION = "2.0.0-💰";
