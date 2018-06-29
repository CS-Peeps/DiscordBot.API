const Binance = require('node-binance-api');
const binance = new Binance().options({
  'APIKEY':process.env.BINANCE_API_KEY,
  'APISECRET':process.env.BINANCE_API_SECRET
});

function round(num) {
	return Math.ceil(num * 100) / 100;
}

exports.price = async (mg, args) => {
	const m = await mg.channel.send("Hmm...");
	var price;
	var pair = args[0] + args[1];
	pair = pair.toUpperCase();
	binance.prices(function(error, ticker) {
		price = ticker[pair];
		if (price != undefined) {
			m.edit(`Price is ${price}`);
		} else {
			m.edit('Invalid Symbol');
		}
	});
};

exports.priceusd = async (mg, args) => {
	const m = await mg.channel.send("Hmm...");
	var price;
	var pair = args[0] + args[1];
	var pairing = args[1];
	var exchange_rate = 1;
	pairing = pairing.toUpperCase();
	pair = pair.toUpperCase();
	binance.prices(function(error, ticker) {
		price = ticker[pair];
		if (price != undefined) {
			if (pairing == "BTC") {
				exchange_rate = ticker["BTCUSDT"];
			}
			if (pairing == "ETH") {
				exchange_rate = ticker["ETHUSDT"];
			}
			if (pairing == "BNB") {
				exchange_rate = ticker["BNBUSDT"];
			}
			price = round(price * exchange_rate);
			m.edit(`Price is ${price} USD`);
		} else {
			m.edit('Invalid Symbol');
		}
	});
};