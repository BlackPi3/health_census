const addPatientButton = document.getElementById("addPatient");
addPatientButton.addEventListener('click', addPatient);

const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const condition = document.getElementById('condition').value;

    if (name && gender && age && condition) {
        patients.push({
            name: name,
            gender: gender,
            age: age,
            condition: condition
        });

        resetForm();
        generateReport();
    }
}

function resetForm() {
    document.getElementById("name").value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = '';
    document.getElementById('condition').value = '';
}

function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        }
    };

    patients.forEach((p) => {
        conditionsCount[p.condition]++;
        genderConditionsCount[p.gender][p.condition]++;
    });

    report.innerHTML = `Number of patients: ${patients.length}<br><br>`;
    report.innerHTML += `Conditions breakdown:<br>`;
    for (const c in conditionsCount) {
        report.innerHTML += `${c}: ${conditionsCount[c]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `${gender}:<br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}