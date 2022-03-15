// CSCI 4710 - Web Applications
// Group 2: Chris Bouton, Troy Nolan, Thomas West


// Model component which handles application logic.
class vampire_model {
	// Instantiate vampire_model object with class variables for storing classmates, vampire count, and human count.
	constructor() {
		this.classmate_data = [];
		this.num_vampire = 0;
		this.num_human = 0;
	}

	// Function that takes the input name as a parameter and makes a random decision about the person's vampire status.
	random_logic(name) {
		
		var score = 0;
		// all vars have a 50% chance of being assigned 0 and a 50% chance of being assigned 1.
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
		// If the score from the previous tests > 6, create and store JSON object in the classmate_data array.
		// return JSON object with the person's name and vampire status (yes).
		if (score > 6) {
			this.classmate_data.push({"name": name, "vampire": "Yes"});
			this.num_vampire++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "Yes"};
		}
		// return JSON object with the person's name and vampire status (no).
		else {
			this.classmate_data.push({"name": name, "vampire": "No"});
			this.num_human++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "No"};
		}
	}

	// Logic for "question quiz" option. Takes the 3 question responses and person name as parameters and makes a decision
	// about the person's vampire status.
	question_logic(ans1, ans2, ans3, name) {

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
		// If vampire score > 6, add JSON object to classmate_data and return the JSON object.
		if (score > 6) {
			this.classmate_data.push({"name": name, "vampire": "Yes"});
			this.num_vampire++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "Yes"};
		}
		// If the score <= 6, add to classmate_data array and return the object.
		else {
			this.classmate_data.push({"name": name, "vampire": "No"});
			this.num_human++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "No"};
		}

	}

	// Getter function that returns an array with the number of vampires and humans as indices.
	get_values() {
		var values = [this.num_vampire, this.num_human];
		return values;
	}

}



// View component which is responsible for updating what the user sees.
class vampire_view {
	// Instantiate a vampire_view object.
	constructor() {}

	// Modify view to show quiz questions to the user.
	show_question_quiz() {

			document.getElementById("question1").style.visibility = "visible";
			document.getElementById("question2").style.visibility = "visible";
			document.getElementById("question3").style.visibility = "visible";
			document.getElementById("results").style.visibility = "visible";

			document.getElementById("vampire").style.visibility = "hidden";
			document.getElementById("human").style.visibility = "hidden";
		}

	// Modify view such that quiz questions are hidden. 
	show_random_quiz() {

			document.getElementById("question1").style.visibility = "hidden";
			document.getElementById("question2").style.visibility = "hidden";
			document.getElementById("question3").style.visibility = "hidden";
			document.getElementById("results").style.visibility = "visible";

			document.getElementById("vampire").style.visibility = "hidden";
			document.getElementById("human").style.visibility = "hidden";
	}

	// Display vampire status message.
	show_vampire() {
		document.getElementById("vampire").style.visibility = "visible";
	}

	// Display human status message.
	show_human() {
		document.getElementById("human").style.visibility = "visible";
	}
	
	// Takes a JSON object as a parameter, creates a new row in table "vampire-table", and sets the objects "name" and "vampire" values as table data.
	update_table (data) {
		var v_table = document.getElementById("vampire-table").getElementsByTagName("tbody")[0];
		var new_row = v_table.insertRow();
		var new_cell1 = new_row.insertCell();
		var new_cell2 = new_row.insertCell();

		var new_text1 = document.createTextNode(data["name"]);
		new_cell1.appendChild(new_text1);

		var new_text2 = document.createTextNode(data["vampire"]);
		new_cell2.appendChild(new_text2);

	}

	// Takes the [num_vampire, num_human] array as a parameter and draws a google pie chart with the given data.
	draw_chart(values) {
		var data = new google.visualization.DataTable();
        // classmate_data_processing(classmate_data, data);
        
		data.addColumn('string', 'Element');
      	data.addColumn('number', 'Count');
      	data.addRows([     
        ['Human', values[1]],
        ['Vampire', values[0]]]);
        // Set chart options
        var options = {title:'Vampire/Human Ratio',
        				titleTextStyle: {color: 'white'},
                      	chartArea: {left:'40%',width:'300',height:'80%'},
					    is3D: true,
					    backgroundColor: '#0a0a0a',
						legend: {textStyle: {color: 'white', fontSize: 16}}};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('vampire-chart'));
        chart.draw(data, options);
	}
}






// Controller component which either updates model data or instructs the view to change.
class vampire_controller {
	// Instantiate a vampire_controller object.
	constructor(v_model, v_view) {
		this.v_model = v_model
		this.v_view = v_view
		this.quiz = "";
	}

	// Starts a new quiz session and instructs the view to enable the correct configuration depending on whether the user selected
	// "Random" or "Question-based".
	start_quiz() {
		this.quiz = document.getElementById("quiz-select");
		// If the user selected "Question-based"
		if (this.quiz.options[this.quiz.selectedIndex].value == "2") {
			this.v_view.show_question_quiz();
		}

		else {
			this.v_view.show_random_quiz();
		}
	}

	// Retrieves the person's name and quiz responses and passes arguments to the correct model function.
	// Also instructs the view to show vampire or human status.
	submit_quiz() {

		var person_name = document.getElementById("sus_name").value;

		if (this.quiz.options[this.quiz.selectedIndex].value == "2") {
			
			var ans1 = document.getElementById("q1-yes").checked;
			var ans2 = document.getElementById("q2-yes").checked;
			var ans3 = document.getElementById("q3-yes").checked;

			console.log(ans1);
			console.log(ans2);
			console.log(ans3);
			console.log(person_name);
			var result = this.v_model.question_logic(ans1, ans2, ans3, person_name);
		}

		else {

			var result = this.v_model.random_logic(person_name);
		}

		if (result["vampire"] == "Yes") {
			this.v_view.show_vampire();
		}

		else {
			this.v_view.show_human();
		}
		// Instruct view to update table layout with the quiz results.
		this.v_view.update_table(result);

		var values = this.v_model.get_values();

		this.v_view.draw_chart(values);

	}

}