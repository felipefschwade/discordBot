const Discord = require('discord.js');
const {token, prefix} = require('./config');
const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES') || !message.guild.me.hasPermission('CHANGE_NICKNAME')) return message.channel.send('Não tenho permissão pra mudar teu nome manito.');
    if (message.author.id === message.guild.ownerID) return message.channel.send('Não tenho permissão pra mudar o nome do dono do canal manito.');
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'change-nick') {
        if (args[0] === undefined || args === "") return message.channel.send('O novo nick é obrigatório irmão.');
        const nick = args[1] !== '' && args[1]!== undefined ? `${args[0]}(${args[1]})` : args[0];
        message.member.setNickname(nick).catch(e => console.error(e));
        message.reply(`Ta ai seu corno, nick alterado com sucesso, novo nick: ${nick}`);
    } else {
        message.channel.send('Não entendi o comando amigão.');
    }
});

client.login(proccess.env.token);