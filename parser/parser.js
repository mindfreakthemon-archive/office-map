'use strict';

// empty for a public repo
const AUTH_USER = '';
const AUTH_PASS = '';
const AUTH_WSNM = '';
const INITIAL_PAGE = '';
const HOSTNAME = '';

let http = require('httpntlm');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');

let teamMap = {
	'MWS': ["Portal", "Mobile&Web", "Portal Luck", "Mobile & Web", "Mobile HUB"],
	'EASY_PUSH': ["Easy Push"],
	'CASINO_MOBILE': ["Casino Mobile", "Casino Mobile dev", "Casino Mobile Dev", "Native Casino"],
	'STG': ["STG", "System Test Group", "Testing Group"],
	'PTV': ["Playtech", "Playtech TV", "TV"],
	'IT': ["IT"],
	'VIDEOBET': ["Videobet"],
	'IMS': ["IMS", "IMS Loyalty", "IMS Campaign&Award"],
	'GLOBAL': ["Global"],
	'SKYWIND': ["Skywind"],
	'CASINO': ["Casino", "Casino 3rd Party"],
	'CROSSRIDER': ["Crossrider"],
	'LIVE': ["Live", "Live Mobile dev"],
	'OAPI': ["Open API"],
	'FINANCE': ["Finance"],
	'HR': ["HR", "H"],
	'MEXOS': ["Mexos"],
	'POKER': ["Poker"],
	'PLAMEE': ["Plamee"],
	'FABRIC': ["Service Fabric"],
	'BET365': ["Dedicated Teams - Bet 365"],
	'MOBENGA': ["Mobenga"],
	'BIG_DATA': ["Big Data"],
	'KIOSK': ["Kiosk"],
	'HTML5_LIVE': ["Mobile HTML5 Live"],
	'ADMINISTRATION': ["Administration", "Administrative dep."],
	'ASIAN_PACIFIC': ["Dedicated Teams - Asian Pacific"],
	'CASUAL_GAMES': ["Casual Games"],
	'SPORTSBOOK': ["Sportsbook"],
	'HTML_INSTALLER': ["HTML Installer & Plugins"],
	'OPERATIONS': ["Management&OSS", "Operations", "Site Operations", "OSS HP Monitoring"],
	'INTERNAL': ["Internal System"]
};

function getWorkers(page) {
	let workers = [];

	function resolveTeam(name) {
		let index = 0;

		for(let team of Object.keys(teamMap)) {
			if (teamMap[team].indexOf(name) > -1) {
				return index;
			}

			index++;
		}
	}

	function getPage(page, resolve) {
		http.get({
			username: AUTH_USER,
			password: AUTH_PASS,
			workstation: AUTH_WSNM,
			url: page,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36'
			}
		}, (error, response) => {
			let body = response.body.split('<table summary="Employees "')[1];
			body = '<table' + body.split('<script xmlns:x')[0];

			let $ = cheerio.load(body);

			$('tr.ms-itmhover')
				.each((i, elem) => {
					let $elem = $(elem);

					let names = $elem.find('.ms-descriptiontext').eq(1).text().split(' ');
					let firstName = names[0];
					let lastName = names[1];
					let position = $elem.find('.ms-descriptiontext').eq(2).text();
					let email = $elem.find('.ms-imnImg').attr('sip');
					let team = $elem.find('.ms-vb2').eq(1).text().trim();
					let id = $elem.find('.ms-vb2').eq(3).text();

					if (email) {
						workers.push({
							id,
							firstName,
							lastName,
							email,
							team: resolveTeam(team),
							position,
							photo: 'http://lorempixel.com/64/64/people'
						});
					}
				});

			let $link = $('#bottomPagingCellWPQ2').find('a').last();

			if ($link.find('img').attr('alt') === 'Next') {
				let link = $link.attr('onclick');

				link = link.split('"')[1];
				link = link.split('"')[0];
				link = HOSTNAME + link;

				getPage(link, resolve);
			} else {
				resolve(workers);
			}
		});
	}

	return new Promise((resolve, reject) => {
		getPage(INITIAL_PAGE, resolve);
	});
}

getWorkers()
	.catch((e) => console.log(e))
	//.then(workers => {
	//	workers.map(worker => worker.team)
	//		.forEach(team => console.log(team));
	//})
	.then(workers => fs.writeFile(path.resolve(path.join(__dirname, '../public/mocks/workers.json')), JSON.stringify(workers, null, '\t')))

