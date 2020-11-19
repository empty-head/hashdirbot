const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const token = fs.readFileSync("token.txt").toString();
const apikey = fs.readFileSync("apikey.txt").toString();
const client = new Discord.Client();
const prefix = '>';

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("Query the HashDir API"); 
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'hd') {
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = args.join(' ');
		console.log(query);
		const pog = await fetch(`https://hashdir.a2hosted.com/api/v1/?query=${query}&token=${apikey}`).then(response => response.json());
		
		try{
			if (!pog.length) {
				return message.channel.send(`No results found for **${args.join(' ')}**.`);
			}
		}
		catch{  }
		const data = [];
		let count = 0;
		for (data1 in pog){
			//console.log(pog[data]['Email'])
			/*
			const embed = new Discord.MessageEmbed()
			.setColor('#FFFFFF')
			.setTitle(pog[data]['ID'])
			.addFields(
				{ name: '__Email__', value: pog[data]['Email'] },
				{ name: '__Password__', value: pog[data]['Password'] },
			); */
			var or1 = "\n\nOrigin: ";
			var or2 = pog[data1]['ID'];
			var res1 = or1.concat(or2);
			
			var e1 = "\nEmail: ";
			var e2 = pog[data1]['Email'];
			var res2 = e1.concat(e2);
			
			var p1 = "\nPassword: ";
			var p2 = pog[data1]['Password'];
			var res3 = p1.concat(p2);
			
			var fin1 = res1.concat(res2);
			var fin2 = fin1.concat(res3);
			data.push(fin2);
			count++;
			//<:trol:778951668590575616>
			//message.channel.send(embed)
		}
		message.channel.send('__' + count + ' RESULTS FOUND FOR:__ ' + query + ' <:pensive_arse:746304695622041601>' + '```' + data.slice(0, 10) + '```');
	}
});

client.login(token);