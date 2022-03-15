// CSCI 4710 - Web Applications
// Group 2: Chris Bouton, Troy Nolan, Thomas West


// Model component which handles application logic.
class vampire_model {

	constructor() {}


	random_logic() {

		var score = 0;

		var rand_shadow = (Math.random()>=0.5)? 1 : 0;
		var rand_complexion = (Math.random()>=0.5)? 1 : 0;
		var rand_garlic = (Math.random()>=0.5)? 1 : 0;

		if (rand_shadow == 0) {
			score = score + 4;
		}

		if (rand_complexion == 1) {
			score = score + 3;
		}

		if (rand_garlic == 0) {
			score = score + 3;
		}
		console.log(score);

		if (score > 6) {
			return true;
		}

		else {
			return false;
		}
	}


	question_logic(ans1, ans2, ans3) {

		var score = 0;

		if (ans1 == false) {
			score = score + 4;
		}

		if (ans2 == true) {
			score = score + 3;
		}

		if (ans3 == false) {
			score = score + 3
		}
		console.log(score);

		if (score > 6) {
			return true;
		}

		else {
			return false;
		}

	}
}



// View component which is responsible for updating what the user sees.
class vampire_view {

	constructor() {}


	show_question_quiz() {

			document.getElementById("question1").style.visibility = "visible";
			document.getElementById("question2").style.visibility = "visible";
			document.getElementById("question3").style.visibility = "visible";
			document.getElementById("results").style.visibility = "visible";

		}


	show_random_quiz() {

			document.getElementById("question1").style.visibility = "hidden";
			document.getElementById("question2").style.visibility = "hidden";
			document.getElementById("question3").style.visibility = "hidden";
			document.getElementById("results").style.visibility = "visible";
	}
			
}






// Controller component which either updates model data or instructs the view to change.
class vampire_controller {

	constructor(v_model, v_view) {
		this.v_model = v_model
		this.v_view = v_view
		this.quiz = "";
	}


	start_quiz() {
		this.quiz = document.getElementById("quiz-select");

		if (this.quiz.options[this.quiz.selectedIndex].value == "2") {
			this.v_view.show_question_quiz();
		}

		else {
			this.v_view.show_random_quiz();
		}
	}


	submit_quiz() {

		if (this.quiz.options[this.quiz.selectedIndex].value == "2") {
			
			var ans1 = document.getElementById("q1-yes").checked;
			var ans2 = document.getElementById("q2-yes").checked;
			var ans3 = document.getElementById("q3-yes").checked;

			console.log(ans1);
			console.log(ans2);
			console.log(ans3);
			var result = this.v_model.question_logic(ans1, ans2, ans3);
		}

		else {

			var result = this.v_model.random_logic();
		}

		if (result == true) {
			document.getElementById("vampire").style.visibility = "visible";
		}

		else {
			document.getElementById("human").style.visibility = "visible";
		}
	}

}