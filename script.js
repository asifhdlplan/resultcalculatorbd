const subjects = [
  "Bangla",
  "English",
  "Mathematics",
  "Religion",
  "ICT",
  "Social Science",
  "Physics",
  "Chemistry",
  "Biology",
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

// create dropdown
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

// GPA calculation
function calculateGPA() {
  let total = 0;
  let optional = 0;
  let failed = false;

  for (let i = 0; i < subjects.length; i++) {
    let grade = document.getElementById("sub" + i).value;
    let point = gradeMap[grade];

    if (point === 0) failed = true;

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
    failed ? "Failed (GPA 0)" : "Your GPA: " + gpa.toFixed(2);
}

// PDF generation
function downloadPDF() {

  const table = document.getElementById("pdfTable");
  table.innerHTML = "";

  let total = 0;
  let optional = 0;
  let failed = false;

  subjects.forEach((sub, i) => {
    let grade = document.getElementById("sub" + i).value;
    let point = gradeMap[grade];

    if (point === 0) failed = true;

    let marks = Math.floor(Math.random() * 20) + 80;

    if (i === subjects.length - 1) {
      optional = point - 2;
      if (optional < 0) optional = 0;
    } else {
      total += point;
    }

    table.innerHTML += `
      <tr>
        <td>${sub}</td>
        <td>${marks}</td>
        <td>${grade}</td>
        <td>${point.toFixed(2)}</td>
      </tr>
    `;
  });

  let gpa = (total + optional) / (subjects.length - 1);
  if (gpa > 5) gpa = 5;

  document.getElementById("pdfGPA").innerText = gpa.toFixed(2);
  document.getElementById("status").innerText = failed ? "FAILED" : "PASSED";
  document.getElementById("date").innerText = new Date().toLocaleDateString();

  document.getElementById("finalGrade").innerText =
    gpa === 5 ? "Golden A+ ✨" : "";

  const element = document.getElementById("pdfContent");

  html2pdf().set({
    margin: 10,
    filename: "SSC_Result.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait" }
  }).from(element).save();
}
