
// Validating Empty Field
function check_empty() {
if (document.getElementById('fileName').value == "" || document.getElementById('videoFile').value == "" ) {
alert("Fill All Fields !");
} 
}
	   

//Function To Display Popup
function div_show() {
	document.getElementById('abc').style.display = "block";
}
//Function to Hide Popup
function div_hide(){

	 document.getElementById('abc').style.display = "none";
}

//Function To Display Popup
function div_showimage() {
	 document.getElementById('abcd').style.display = "block";
}
//Function to Hide Popup
function div_hideimage(){

	document.getElementById('abcd').style.display = "none";
}

//Function To Display Popup
function div_showplaylist() {
	document.getElementById('abcplaylist').style.display = "block";
}
//Function to Hide Popup
function div_hideplaylist(){

	document.getElementById('abcplaylist').style.display = "none";
}

function div_showregplay() {
	document.getElementById('abcregplay').style.display = "block";
}
//Function to Hide Popup
function div_hideregplay(){

	document.getElementById('abcregplay').style.display = "none";
}

function div_showgroup() {
	document.getElementById('abcgroup').style.display = "block";
}
//Function to Hide Popup
function div_hidegroup(){

	document.getElementById('abcgroup').style.display = "none";
}

function div_showDeploy() {
	document.getElementById('deploy_form').style.display = "block";
}
//Function to Hide Popup
function div_hideDeploy(){
		
	document.getElementById('deploy_form').style.display = "none";
}
function div_showadddate() {
	getPlaylist();
	document.getElementById('abcadddate').style.display = "block";
}
//Function to Hide Popup
function div_hideadddate(){
		
	document.getElementById('abcadddate').style.display = "none";
}
function div_showTicker() {
	document.getElementById('form_ticker').style.display = "block";
}
//Function to Hide Popup
function div_hideTicker(){
		
	document.getElementById('form_ticker').style.display = "none";
}