// 🔥 TOKIO BOT 2026 - MENU INTERATIVO LIMPO 💀
const { default: makeWASocket, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } = require('@adiwajshing/baileys')
const qrcode = require('qrcode-terminal')
const fs = require('fs')
const readline = require('readline')

console.clear()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function menuPrincipal() {
    console.log('
📱 TOKIO BOT - ESCOLHA:')
    console.log('1️⃣  QR Code (escaneie no WhatsApp)')
    console.log('2️⃣  Código de pareamento (digite número)')
    console.log('3️⃣  Sair')
    console.log('4️⃣  Atualizar bot')
    console.log('5️⃣  Apagar QR code salvo')
    console.log('
🔢 Digite o número: ')
}

async function limparSessao() {
    if (fs.existsSync('auth_info_tokio')) {
        fs.rmSync('auth_info_tokio', { recursive: true, force: true })
        console.log('🗑️  QR code apagado!')
    }
}

async function startTokio() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_tokio')
    
    const sock = makeWASocket({
        logger: false,
        printQRInTerminal: true,
        auth: state,
        browser: ['TOKIO BOT', 'Chrome', '1.0.0'],
        markOnlineOnConnect: false
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, qr } = update
        
        if(qr) {
            console.log('
📱 QR CODE ATIVO')
            console.log('✅ WhatsApp > Aparelhos conectados')
        }
        
        if(connection === 'close') {
            console.log('
❌ Conexão perdida')
            console.log('🔄 Reconectando em 3s...')
            setTimeout(startTokio, 3000)
        } 
        
        if(connection === 'open') {
            console.log('
✅ TOKIO BOT CONECTADO!')
            console.log('💻 Status: Online | Comandos: /menu')
        }
    })

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if(!msg.message) return
        
        const from = msg.key.remoteJid
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase().trim()
        
        if(text === '/menu' || text === 'menu') {
            await sock.sendMessage(from, { 
                text: `🔥 *TOKIO BOT 2026* 💀

⚡ 0ms Latência
👻 Stealth Mode  
🖥️ Matrix Effect
💎 Free Fire UC

*COMANDOS:*
🔥 hack-alvo
🧠 /ia pergunta
🖥️ matrix
💎 diamantes

*Cleiton Costa*` 
            })
        }

        if(text.includes('hack-alvo') || text === '/hack') {
            await sock.sendMessage(from, { 
                text: `💀 *HACK-ALVO ATIVADO* 💀

```
[██████████] 100% INVASÃO OK
[*] Bypass     ✅ 0.2s
[*] Root       ✅ 0.8s  
[*] Backdoor   ✅ 3.0s
```` 
            })
        }
    })
}

// 🚀 INICIA
menuPrincipal()
rl.question('Opção: ', async (op) => {
    if(op === '1') {
        console.log('
🔄 Iniciando QR Code...')
        await startTokio()
    } else if(op === '2') {
        console.log('
📱 CÓDIGO DE PAREAMENTO')
        rl.question('Número (+55): ', (numero) => {
            console.log(`
✅ Código para: ${numero}`)
            console.log('📱 WhatsApp > "Conectar com número" > Digite: ${numero}')
            console.log('🔢 Cole o código aqui:')
        })
    } else if(op === '3') {
        process.exit(0)
    } else if(op === '5') {
        await limparSessao()
    }
    rl.close()
})
