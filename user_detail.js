
const app = new Realm.App({ id: "cloud_hw-afjlh" });
			
var user_lst;
var comment_lts;
var rate_lts;
var play_lts;
var user_name;
var index = 0;
var disable_lst;


$(document).ready(function(){
  getRate();	

  getDisable();
  getComment();
  
});




function getUserName() {
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1).split("=")[1];
	user_name = queryString;
	return queryString
}


async function getUser() {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	
	var user_db = "user";
	user_name = getUserName();
	var user_obj = {"_id": user_name};

	try{
		const resultOfCallFunction = await user.functions.getQuery(user_db, user_obj);
		console.log(resultOfCallFunction);
		user_lst = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}
	setUser();
}



async function getDisable() {
	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	
	var duser_obj = {};

	try{
		const resultOfCallFunction = await user.functions.getQuery("disable", duser_obj);
		console.log(resultOfCallFunction);
		disable_lst = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}

	
}

function checkDisable(game_nm) {

	if (disable_lst.length > 0) {
		for (var i = 0; i < disable_lst.length; i++) {
			if(disable_lst[i]["_id"] == game_nm) {
				return true;
			}
		}
	}
	return false;
}





async function getComment() {
	user_nm = getUserName();
	var comment_obj = { "user": user_nm };
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


async function getRate() {
	user_nm = getUserName();
	var rate_obj = { "user": user_nm };
	var rate_db = "votes";

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);
	
	try{
		const resultOfCallFunction = await user.functions.getQuery(rate_db, rate_obj);
		console.log("->",resultOfCallFunction);
		rate_lts = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}

	getPlaytime();
}



async function getPlaytime() {
	user_n = getUserName();
	var play_obj = { "user": user_n };
	var play_db = "playtime";

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);
	
	try{
		const resultOfCallFunction = await user.functions.getQuery(play_db, play_obj);
		console.log("->",resultOfCallFunction);
		play_lts = resultOfCallFunction;
	}
	catch (e){
		console.log("error")	
	}
	getUser();
}




async function setUser() {

	console.log(user_lst[0]["_id"])
	document.getElementById("u_name").innerHTML  = user_lst[0]["_id"];
	document.getElementById("u_play").innerHTML  = user_lst[0]["total_play_time"];

	if (rate_lts.length == 0) {
		document.getElementById("u_average").innerHTML  =  "-"

	}
	
	else {	
		var tmp = 0;
		for (var i = 0; i < rate_lts.length ; i++) {
			tmp += rate_lts[i]["rate"];
		}

		document.getElementById("u_average").innerHTML  = (tmp / rate_lts.length).toFixed(2);
	}

	if (play_lts.length == 0) {
		document.getElementById("u_game").innerHTML  = "-";
	}

	else {
		var tmp = 0;
		var big_play = play_lts[0]["play_time"];
		var index = 0;
		for (var i = 0; i < play_lts.length ; i++) {
			if (big_play < play_lts[i]["play_time"]) {
				index = i;
			}
		}


		document.getElementById("u_game").innerHTML  = play_lts[index]["game"].toUpperCase();

	}

	



}




async function setComment() {

	//console.log("commnet", comment_lts.length)

	for (var i = 0 ; i < comment_lts.length; i++) {
		if (checkDisable(comment_lts[i]["game"]) == false) {
			setView(comment_lts[i]["game"].toUpperCase(), comment_lts[i]["comment"]);
		}
		
	}
}




function setView(game_name, comments) {

	var doc = document.createElement("tbody");
	var trimmed = comments.trim().replace(/ /g, '%20');

	var html =  '<tr class=""> ' +
				'	<th>Game : ' + game_name + '</th> ' +
				'	<td> ' + comments + '</td> ' +
				'</tr>		' +
				'<tr class="alt"></tr> ' ;


	doc.innerHTML = html.trim();
	document.getElementById("game_comment").appendChild(doc);		

}




async function addPlaytime() {
	var hour = document.getElementById("play_hour").value;
	var game_id = document.getElementById("game_text").value;

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":user_name+game_id,"user":user_name,"game": game_id,"play_time":parseInt(hour)};
		console.log(obj);	

	try{
		const resultOfCallFunction = await user.functions.addPlaytime(obj);
		console.log(resultOfCallFunction)
		if (resultOfCallFunction == false) {
		window.alert("Error Occured");
		}
		else {
		window.alert("Playtime Succesfully Added");
		updateVote(game_id);

		}
	}
	catch (e){
		console.log("error", e)
		window.alert("Eror occured (Probably game name is wrong)")

	}
}





async function checkPlayTime(gameName) {

	var time = 0;
	for (var i = 0; i < play_lts.length; i++) {
		if (play_lts[i]["game"] == gameName) {
			time = play_lts[i]["play_time"];
			break;
		}
	}
	if (time > 60) {
		return true;
	}
	return false;
}


async function  makeComment() {
	
	var game_name = document.getElementById("game_name").value;
	var comment = document.getElementById("game_com").value;

	if (await checkPlayTime(game_name) == false) {
		window.alert("You must play at least 60 minutes")

		return
	}	

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":user_name+game_name,"user":user_name,"game": game_name, "comment": comment,"play_time":0};
		console.log(obj);	

	try{
		const resultOfCallFunction = await user.functions.makeComment(obj);
		console.log(resultOfCallFunction)
		if (resultOfCallFunction == false) {
		window.alert("Error Occured");
		}
		else {
		window.alert("Comment Succesfully Added")
		}
	}
	catch (e){
		console.log("error", e)
		window.alert("Eror occured")

	}

}






async function makeVote() {
	var vote = document.getElementById("play_rate").value;
	var game_vid = document.getElementById("game_text_rate").value;

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);

	var obj = {"_id":user_name+game_vid,"user":user_name,"game": game_vid, "rate": parseInt(vote)};
		console.log(obj);	

	try{
		const resultOfCallFunction = await user.functions.addVote(obj);
		console.log(resultOfCallFunction)
		console.log(resultOfCallFunction)
		if (resultOfCallFunction == false) {
		window.alert("Error Occured");
		}
		else {
			window.alert("Rate Succesfully Added");
			updateVote(game_vid);
		}
		
	}
	catch (e){
		console.log("error", e);
		window.alert("Eror occured");

	}


}



async function updateVote(gn) {
	

	const credentials = Realm.Credentials.anonymous();
	const user = await app.logIn(credentials);	  	

	try{
		const resultOfCallFunction = await user.functions.updateVotes(gn);
	}
	catch (e){
		console.log("error")	
	}
}


 


