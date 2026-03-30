const subjects = [
  "Bangla",
  "English",
  "Math",
  "Science",
  "Religion",
  "ICT",
  "Social Science",
  "Optional Subject"
];

const gradeMap = {
  "A+": 5.0,
  "A": 4.0,
  "A-": 3.5,
  "B": 3.0,
  "C": 2.0,
  "D": 1.0,
  "F": 0.0
};

// create dropdowns
const subjectDiv = document.getElementById("subjects");

subjects.forEach((sub, index) => {
  let select = document.createElement("select");
  select.id = "sub" + index;

  for (let grade in gradeMap) {
    let option = document.createElement("option");
    option.value = grade;
    option.text = sub + " - " + grade;
    select.appendChild(option);
  }

  subjectDiv.appendChild(select);
});

// calculate GPA
function calculateGPA() {
  let total = 0;
  let optional = 0;

  for (let i = 0; i < subjects.length; i++) {
    let grade = document.getElementById("sub" + i).value;
    let point = gradeMap[grade];

    // check fail
    if (point === 0) {
      document.getElementById("result").innerText = "Failed (GPA 0)";
      return;
    }

    // optional subject
    if (i === subjects.length - 1) {
      optional = point - 2;
      if (optional < 0) optional = 0;
    } else {
      total += point;
    }
  }

  let gpa = (total + optional) / (subjects.length - 1);
  if (gpa > 5) gpa = 5;

  document.getElementById("result").innerText =
    "Your GPA: " + gpa.toFixed(2);
}
