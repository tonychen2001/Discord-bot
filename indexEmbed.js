// require the discord.js module
const NBA = require("nba");



const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
// create a new Discord client
const client = new Discord.Client();

//var playerState;
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('ready!')
})

client.on('message', message => {
    client.user.setGame('BB player fullname')
    if (message.content.startsWith(`${prefix} `)) {
        const player = NBA.findPlayer(message.content.substring(3));
        console.log(JSON.stringify(player));
        var obj = JSON.parse(JSON.stringify(player));
        NBA.stats.playerInfo({ PlayerID: player.playerId }).then(displayPlayer);

        function displayPlayer(P) {
            const playerStat = JSON.parse(JSON.stringify(P));
            const playerEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('NBA')
                .setURL('https://nba.com')
                .setThumbnail('https://theundefeated.com/wp-content/uploads/2017/05/nba-logo.png')
                .addField(playerStat.commonPlayerInfo[0].firstName + " " + playerStat.commonPlayerInfo[0].lastName, playerStat.playerHeadlineStats[0].timeFrame)
                .addField('Team', playerStat.commonPlayerInfo[0].teamCity + ' ' + playerStat.commonPlayerInfo[0].teamCode, true)
                .addField('Jersey', playerStat.commonPlayerInfo[0].jersey, true)
                .addField('Height', playerStat.commonPlayerInfo[0].height, true)
                .addField('Weight', playerStat.commonPlayerInfo[0].weight, true)
                .addField('Points', playerStat.playerHeadlineStats[0].pts, true)
                .addField('Assists', playerStat.playerHeadlineStats[0].ast, true)
                .addField('Rebounds', playerStat.playerHeadlineStats[0].reb, true)
        
            message.channel.send(playerEmbed);
        }
        
        NBA.stats.teamInfoCommon({ TeamID: player.teamId }).then(displayTeam);

        function displayTeam(T) {
            const teamStat = JSON.parse(JSON.stringify(T));
            const teamEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('NBA')
                .setURL('https://nba.com')
                .setThumbnail('https://theundefeated.com/wp-content/uploads/2017/05/nba-logo.png')
                .addField(teamStat.teamInfoCommon[0].teamCity + " " + teamStat.teamInfoCommon[0].teamName, teamStat.teamInfoCommon[0].seasonYear)
                .addField('Conference', teamStat.teamInfoCommon[0].teamConference, true)
                .addField('Conf Rank', teamStat.teamInfoCommon[0].confRank, true)
                .addField('Wins', teamStat.teamInfoCommon[0].w, true)
                .addField('Losses', teamStat.teamInfoCommon[0].l, true)
                .addField('Win Pct', teamStat.teamInfoCommon[0].pct, true)

                message.channel.send(teamEmbed);
        }
    }
    
})

// login to Discord with your app's token
client.login(token);


    