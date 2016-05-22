var request = require('request');
var cheerio = require('cheerio');
var entities = require('html-entities').AllHtmlEntities;

function getInfo(err, res, body) {
	var $ = cheerio.load(body);
	var abi = JSON.parse(entities.decode($("#js-copytextarea2").html()));
	for (var i in abi) {
		//console.log(abi[i]);
		if (abi[i].type == "function") {
			var func = abi[i];
			console.log("----------------------------------------------");
			console.log("function " + func.name + " (");
			for (var j in func.inputs)
				console.log("	"
						+ func.inputs[j].type + " "
						+ func.inputs[j].name
						+ ((j == func.inputs.length - 1) ? "" : ", "))
					console.log(") returns (");
			for (var j in func.outputs)
				console.log("	"
						+ func.outputs[j].type + " "
						+ func.outputs[j].name
						+ ((j == func.outputs.length - 1) ? "" : ", "))
					console.log(")");
			console.log("----------------------------------------------\n\n");
		}
	}
}

request("http://etherscan.io/address/" + process.argv[2] + "#code", getInfo);
