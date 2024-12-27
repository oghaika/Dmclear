const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { Client } = require('discord.js-selfbot-v13');
const chalk = require('chalk');


let client = new Client({
    checkUpdate: false
});

// Codigo By Haika <3

let c = {
    useProxy: false,
    token: "SEU TOKEN",
    maxRetries: 10, 
    retryDelay: 5000
}

let p = {
    host: "p.webshare.io",
    port: 80,
    auth: {
        username: "tpvljbuz-rotate",
        password: "htlit1hdz8eg"
    },
}

const s = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const l = {
    info: (m) => console.log(chalk.magenta('» ') + m),
    success: (m) => console.log(chalk.magenta('√ ') + m),
    error: (m) => console.log(chalk.red('× ') + m),
    warn: (m) => console.log(chalk.yellow('! ') + m),
    title: (m) => {
        console.log('\n' + chalk.magenta('━'.repeat(70)));
        console.log(chalk.magenta('│') + ' ' + chalk.magentaBright(m));
        console.log(chalk.magenta('━'.repeat(70)) + '\n');
    },
    progress: (current, total) => {
        const percentage = (current / total) * 100;
        const blocks = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));
        console.log(chalk.magenta(`[${blocks}] ${percentage.toFixed(1)}% (${current}/${total})`));
    }
};


function Dash() {
    console.clear();
    console.log(chalk.magentaBright(`
    
     ooooo      ooo                                  .oooooo..o     .                       oooo                     
     \`888b.     \`8'                                 d8P'    \`Y8   .o8                       \`888                     
      8 \`88b.    8   .ooooo.  oooo oooo    ooo      Y88bo.      .o888oo  .ooooo.   .oooo.    888   .ooooo.  oooo d8b 
      8   \`88b.  8  d88' \`88b  \`88. \`88.  .8'        \`"Y8888o.    888   d88' \`88b \`P  )88b   888  d88' \`88b \`888""8P 
      8     \`88b.8  888   888   \`88..]88..8'             \`"Y88b   888   888ooo888  .oP"888   888  888ooo888  888     
      8       \`888  888   888    \`888'\`888'         oo     .d8P   888 . 888    .o d8(  888   888  888    .o  888     
     o8o        \`8  \`Y8bod8P'     \`8'  \`8'          8""88888P'    "888" \`Y8bod8P' \`Y888""8o o888o \`Y8bod8P' d888b    
                                                                                                                    
                                                                                                                
                                                                                                                
    
                                        [ Version 1.0.0 - By Haika ]                                      

    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀��▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

    ║ STATUS
    ╠══════════════════════════════════════════════════════════════════════════════════
    ║  Author: ${chalk.magentaBright('Haika')}                          Status: ${chalk.greenBright('ONLINE')}
    ║

    ║ CONFIG
    ╠══════════════════════════════════════════════════════════════════════════════════
    ║  Proxy: ${c.useProxy ? chalk.greenBright('ATIVADO') : chalk.redBright('DESATIVADO')}
    ║  Token: ${chalk.gray(c.token.substring(0, 20) + '...')}
    ║

    ║ COMANDOS
    ╠══════════════════════════════════════════════════════════════════════════════════
    ║  ${chalk.white('!cleardm')}      - Limpa mensagens do canal atual
    ║  ${chalk.white('!cleardm <id>')}  - Limpa mensagens do canal específico
    ║  ${chalk.white('!proxy on')}      - Ativa o proxy
    ║  ${chalk.white('!proxy off')}     - Desativa o proxy
    ║  ${chalk.white('!proxy status')}  - Mostra status do proxy
    ║

    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄`));
}


function AxiosInstance() {
    const h = {
        'accept': '*/*',
        'accept-language': 'pt-BR,pt;q=0.9',
        'authorization': c.token,
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    };

    if (c.useProxy) {
        return axios.create({
            proxy: false,
            httpsAgent: new HttpsProxyAgent({
                host: p.host,
                port: p.port,
                auth: `${p.auth.username}:${p.auth.password}`
            }),
            headers: h
        });
    } else {
        return axios.create({ headers: h });
    }
}


let a = AxiosInstance();


async function CaptureAllMessages(channelId) {
    let messages = [];
    let lastId = null;
    
    l.title('» Procurando mensagens...');
    
    while (true) {
        try {
            let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`;
            if (lastId) url += `&before=${lastId}`;

            l.info(`» Buscando mais mensagens... ${chalk.gray(url)}`);
            
            const response = await a.get(url);
            const batch = response.data;
            
            if (batch.length === 0) break;

            messages = messages.concat(batch);
            lastId = batch[batch.length - 1].id;

            l.success(`√ Encontrei mais ${chalk.green(batch.length)} mensagens! (Total: ${chalk.green(messages.length)})`);
            await s(300);
        } catch (error) {
            l.error(`× Algo deu errado: ${error.response?.data?.message || error.message}`);
            if (error.response?.status === 407) {
                l.warn('! Problema com o proxy - verifique as configurações');
            }
            break;
        }
    }

    return messages;
}

async function ClearAll(channelId) {
    const messages = await CaptureAllMessages(channelId);
    const userMessages = messages.filter(m => m.author.id === client.user.id);
    
    let deletadas = 0;
    let falhas = 0;
    const maxFalhas = 3;
    console.clear();
    
    for (const message of userMessages) {
        let deletada = false;
        let tentativas = 0;
        
        while (!deletada && tentativas < maxFalhas) {
            try {
                await a.delete(`https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`);
                deletadas++;
                deletada = true;
                falhas = 0;
                
                console.clear();
                const percentage = (deletadas / userMessages.length) * 100;
                const blocks = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));
                l.info(`\n\n     » Limpando mensagens: ${percentage.toFixed(1)}%\n`);
                l.success(`     [${blocks}] ${deletadas}/${userMessages.length}\n`);
                
                await s(500);
            } catch (error) {
                tentativas++;
                if (error.response?.status === 429) {
                    const retryAfter = error.response.data.retry_after || 5;
                    l.warn(`     » Rate limit - Aguardando ${retryAfter}s... (Tentativa ${tentativas}/${maxFalhas})`);
                    await s(retryAfter * 1000);
                } else {
                    l.error(`     × Falha ao deletar - Tentativa ${tentativas}/${maxFalhas}`);
                    await s(1000);
                }
                
                if (tentativas >= maxFalhas) {
                    falhas++;
                    if (falhas >= 5) {
                        l.error(`     ! Muitas falhas seguidas. Pausando por 30 segundos...`);
                        await s(30000);
                        falhas = 0;
                    }
                }
            }
        }
    }
    
    console.clear();
    l.success(`\n\n     √ Concluído! ${deletadas}/${userMessages.length} mensagens foram deletadas.\n`);
    await s(3000);
    Dash();
}



client.on('ready', () => {
    Dash();
});

client.on('messageCreate', async (m) => {
    if (m.author.id === client.user.id) {
        const cmd = m.content.toLowerCase();
        
        if (cmd.startsWith('!cleardm')) {
            console.clear();
            l.info('» Comando recebido! Iniciando limpeza...');
            try {
                let channelId;
                const args = m.content.split(' ');
                if (args[1]) {
                    channelId = args[1];
                } else {
                    channelId = m.channel.id;
                }
                await m.delete().catch(() => {});
                await ClearAll(channelId);
            } catch (e) {
                l.error('Ops! Algo deu errado:', e);
            }
        }
        else if (cmd === '!proxy on') {
            console.clear();
            c.useProxy = true;
            a = AxiosInstance();
            m.channel.send('» Proxy ativado com sucesso!').then(msg => setTimeout(() => msg.delete(), 3000));
            Dash();
        }
        else if (cmd === '!proxy off') {
            console.clear();
            c.useProxy = false;
            a = AxiosInstance();
            m.channel.send('» Proxy desativado!').then(msg => setTimeout(() => msg.delete(), 3000));
            Dash();
        }
        else if (cmd === '!proxy status') {
            m.channel.send(`» O proxy está ${c.useProxy ? 'ATIVADO √' : 'DESATIVADO ×'}`).then(msg => setTimeout(() => msg.delete(), 3000));
        }
    }
});

process.on('unhandledRejection', (error) => {
    console.error('Erro não tratado:', error);
});

client.login(c.token).catch(console.error);
