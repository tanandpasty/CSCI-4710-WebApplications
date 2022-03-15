// CSCI 4710 - Web Applications
// Group 2: Chris Bouton, Troy Nolan, Thomas West


// Model component which handles application logic.
class vampire_model {

	constructor() {
		this.classmate_data = [];
		this.num_vampire = 0;
		this.num_human = 0;
	}


	random_logic(name) {

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
			this.classmate_data.push({"name": name, "vampire": "Yes"});
			this.num_vampire++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "Yes"};
		}

		else {
			this.classmate_data.push({"name": name, "vampire": "No"});
			this.num_human++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "No"};
		}
	}


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

		if (score > 6) {
			this.classmate_data.push({"name": name, "vampire": "Yes"});
			this.num_vampire++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "Yes"};
		}

		else {
			this.classmate_data.push({"name": name, "vampire": "No"});
			this.num_human++;
			console.log(JSON.stringify(this.classmate_data));
			return {"name": name, "vampire": "No"};
		}

	}


	get_values() {
		var values = [this.num_vampire, this.num_human];
		return values;
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

			document.getElementById("vampire").style.visibility = "hidden";
			document.getElementById("human").style.visibility = "hidden";
		}


	show_random_quiz() {

			document.getElementById("question1").style.visibility = "hidden";
			document.getElementById("question2").style.visibility = "hidden";
			document.getElementById("question3").style.visibility = "hidden";
			document.getElementById("results").style.visibility = "visible";

			document.getElementById("vampire").style.visibility = "hidden";
			document.getElementById("human").style.visibility = "hidden";
	}


	show_vampire() {
		document.getElementById("vampire").style.visibility = "visible";
	}


	show_human() {
		document.getElementById("human").style.visibility = "visible";
	}

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


	draw_chart(values) {
		var data = new google.visualization.DataTable();
        // classmate_data_processing(classmate_data, data);
        
		data.addColumn('string', 'Element');
      	data.addColumn('number', 'Count');
      	data.addRows([     
        ['Human', values[1]],
        ['Vampire', values[0]]]);
        // Set chart options
        var options = {'title':'Vampire/Human Ratio',
                       'width':400,
                       'height':300,
					    is3D: true,
					    backgroundColor: '#0a0a0a'};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('vampire-chart'));
        chart.draw(data, options);
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

		this.v_view.update_table(result);

		var values = this.v_model.get_values();

		this.v_view.draw_chart(values);

	}

}