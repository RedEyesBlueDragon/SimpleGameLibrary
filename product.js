
const app = new Realm.App({ id: "cloud_hw-afjlh" });
			
var game_lts;
var comment_lts;
var game_name;
var index = 0;


$(document).ready(function(){
  updateVote();		
  getGame();
  getComment();
  
});

async function updateVote() {
	var gn = getGameName();

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	

	try{
		const resultOfCallFunction = await user.functions.updateVotes(gn);
	}
	catch (e){
		console.log("error")	
	}
}


function getGameName() {
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1).split("=")[1];
	console.log("->",queryString)
	return queryString
}


async function getGame() {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	
	var game_db = "game";
	game_name = getGameName();
	var game_obj = {"_id": game_name};

	try{
		const resultOfCallFunction = await user.functions.getQuery(game_db, game_obj);
		console.log(resultOfCallFunction);
		game_lts = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}
	setGame();
}



async function checkDisable() {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	
	var duser_obj = {};
	var disable_lst;

	try{
		const resultOfCallFunction = await user.functions.getQuery("disable", duser_obj);
		console.log(resultOfCallFunction);
		disable_lst = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}

	if (disable_lst.length > 0) {
		for (var i = 0; i < disable_lst.length; i++) {
			if(disable_lst[i]["_id"] == game_name) {
				return true;
			}
		}
	}
	return false;
}



async function getComment() {
	if (await checkDisable() == true) {
		return;
	}
	game_name = getGameName();
	var comment_obj = { "game": game_name };
	var comment_db = "comment";

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);
	
	try{
		const resultOfCallFunction = await user.functions.getQuery(comment_db, comment_obj);
		console.log("->",resultOfCallFunction);
		comment_lts = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}

	setComment();
}





async function setGame() {

	console.log(game_lts[0]["_id"])
	document.getElementById("gimage").src  = game_lts[0]["photo"];
	document.getElementById("gname").innerHTML  = game_lts[0]["_id"].toUpperCase() + " (id:" + game_lts[0]["_id"] + ")";
	;
	document.getElementById("ggenre").innerHTML  = game_lts[0]["genre"].toUpperCase();
	document.getElementById("gyear").innerHTML  = game_lts[0]["release"];
	var flag = await checkDisable();
	if (game_lts[0]["rate"] != 0 && flag == false) {
		document.getElementById("grate").innerHTML  = game_lts[0]["rate"].toFixed(2);
	} 
	else {
		document.getElementById("grate").innerHTML  = "-";
	}
	document.getElementById("gplay_time").innerHTML  = game_lts[0]["play_time"];
	document.getElementById("home").innerHTML  = game_lts[0]["desc"];

}




async function setComment() {

	//console.log("commnet", comment_lts.length)

	for (var i = 0 ; i < comment_lts.length; i++) {
		setView(comment_lts[i]["user"], comment_lts[i]["comment"]);
	}
}




function setView(user_name, comments) {

	var doc = document.createElement("tbody");
	var trimmed = comments.trim().replace(/ /g, '%20');

	var html =  '<tr class=""> ' +
				'	<th>User: ' + user_name + '</th> ' +
				'	<td> ' + comments + '</td> ' +
				'</tr>		' +
				'<tr class="alt"></tr> ' ;


	doc.innerHTML = html.trim();
	document.getElementById("game_comment").appendChild(doc);		

}






