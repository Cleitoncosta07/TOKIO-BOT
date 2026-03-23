const fs = require("fs");
const { pegarAudioAleatorioBuffer } = require("./audiosAleatorios2");

function DLT_FL(filePath) {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

async function menuButtonsHandler(
  tedzinho,
  from,
  pushname,
  date,
  hora,
  info,
  reply,
  prefix,
  BOT_EMOJI,     // vai ser 💰 ou outro que você usa
  BOT_VERSION,
  NomeDoBot = "TOKIO BOT"
) {
  try {
    const imagemMenu = "https://xatimg.com/image/TyANiC68n4eZ.jpg";

    // Envia áudio do menu
    const audioBuffer = await pegarAudioAleatorioBuffer();
    if (audioBuffer) {
      await tedzinho.sendMessage(from, {
        audio: audioBuffer,
        ptt: true,
        mimetype: "audio/mpeg",
      }, { quoted: info });
    } else {
      console.warn("⚠️ Falha ao carregar áudio do menu.");
      reply("⚠️ O áudio do menu não está disponível no momento.");
    }

    // Envia imagem com menu em botões
    const msg = await tedzinho.sendMessage(from, {
      image: { url: imagemMenu },
      caption: `
╭─❍【💰 *${NomeDoBot} ${BOT_VERSION}* 💰】❍─╮
│👤 Usuário: *${pushname}*
│📆 Data: *${date}*
│⏰ Horário: *${hora}*
│⌨️ Prefixo: *${prefix}*
╰────────────────────╯
      `.trim(),
      footer: `💰 TOKIO LA CASA DE PAPEL | Professor Cleiton Costa 💙`,
      buttons: [
        {
          buttonId: "action",
          buttonText: { displayText: "🌐 Comandos do TOKIO" },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify({
              title: "🌐 MENU TOKIO - LA CASA DE PAPEL",
              sections: [
                {
                  title: "👥 Comandos Membros",
                  highlight_label: "TOKIO Bot",
                  rows: [
                    { title: "⚡ Ping", description: "Velocidade do Tokio.", id: `${prefix}ping` },
                    { title: "💎 Menu", description: "Abrir menu épico.", id: `${prefix}menu` },
                    { title: "👤 Perfil", description: "Seu perfil no TOKIO.", id: `${prefix}perfil` },
                    { title: "🆔 ID Real", description: "Seu ID real no WhatsApp.", id: `${prefix}lid` },
                    { title: "🔗 Link do Grupo", description: "Link do grupo atual.", id: `${prefix}link` },
                    { title: "🎨 Figurinha", description: "Criar figurinha a partir de mídia.", id: `${prefix}sticker` }
                  ]
                },
                {
                  title: "💰 Economia",
                  rows: [
                    { title: "💵 Saldo", description: "Ver seu saldo atual.", id: `${prefix}saldo` },
                    { title: "🎁 Daily", description: "R$500 diários.", id: `${prefix}daily` },
                    { title: "💼 Trabalhar", description: "Ganhe até R$10.000.", id: `${prefix}trabalhar` },
                    { title: "🏦 Roubar", description: "Assalto perfeito! 🏦", id: `${prefix}roubar` }
                  ]
                },
                {
                  title: "⭐ Níveis e Ranking",
                  rows: [
                    { title: "🏆 Rank", description: "Top 10 do grupo.", id: `${prefix}rank` },
                    { title: "📈 Nível", description: "Seu nível atual.", id: `${prefix}level` },
                    { title: "⚡ XP Turbo", description: "Aumente XP rápido.", id: `${prefix}nivelar` }
                  ]
                },
                {
                  title: "🧠 Super IA",
                  rows: [
                    { title: "🚀 GPT-4o", description: "IA GPT-4o Elite.", id: `${prefix}gpt` },
                    { title: "⚡ Gemini", description: "IA Gemini Flash.", id: `${prefix}gemini` },
                    { title: "🧠 Claude 3.5", description: "Claude 3.5 Sonnet.", id: `${prefix}claude` },
                    { title: "😂 GROK", description: "Humor máximo.", id: `${prefix}grok` }
                  ]
                },
                {
                  title: "👑 Admin",
                  rows: [
                    { title: "🚫 Ban", description: "Expulsar membro.", id: `${prefix}ban` },
                    { title: "👢 Kick", description: "Chutar do grupo.", id: `${prefix}kick` },
                    { title: "🔗 Add", description: "Adicionar por link.", id: `${prefix}add` },
                    { title: "🙈 Hidetag", description: "Mencionar todos ocultos.", id: `${prefix}hidetag` },
                    { title: "🔒 Anti-link", description: "Ativar/desativar anti-link (1/0).", id: `${prefix}antilink 1` },
                    { title: "🎉 Boas-vindas", description: "Ativar/desativar boas-vindas (1/0).", id: `${prefix}welcome 1` }
                  ]
                },
                {
                  title: "💰 Owner",
                  rows: [
                    { title: "🔧 Eval", description: "Executar código JS.", id: `${prefix}eval` },
                    { title: "🔴 Desligar", description: "Desligar TOKIO Bot.", id: `${prefix}shutdown` },
                    { title: "🔄 Recarregar", description: "Recarregar tudo.", id: `${prefix}reload` },
                    { title: "⌨️ Setprefix", description: "Mudar prefixo do bot.", id: `${prefix}setprefix` }
                  ]
                },
                {
                  title: "🎮 Diversão",
                  rows: [
                    { title: "🎲 Dado", description: "Jogue dado 1–6.", id: `${prefix}dado` },
                    { title: "🔊 TTS", description: "Texto para voz.", id: `${prefix}tts` },
                    { title: "😈 Fake", description: "Chat falso.", id: `${prefix}fake` }
                  ]
                }
              ]
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true
    }, { quoted: info });

    // Reage com emoji de estilo LA CASA DE PAPEL (💰)
    await tedzinho.sendMessage(from, {
      react: {
        text: BOT_EMOJI || "💰",   // use seu BOT_EMOJI (ex: 💰)
        key: info.key              // reage na mensagem do usuário
      }
    });

  } catch (error) {
    console.error("❌ Erro ao exibir menu com botões:", error);
    reply("❌ Ocorreu um erro ao exibir o menu. Tente novamente mais tarde.");
  }
}

module.exports = {
  menuButtonsHandler
};