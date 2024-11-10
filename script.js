var _a;
// Get all the form steps
var formSteps = document.querySelectorAll('.form-step');
var nextButtons = document.querySelectorAll('.nextBtn');
var submitButton = document.getElementById('submitForm');
var currentStep = 0;
var resumeData = {
    fullName: '',
    email: '',
    phone: '',
    degree: '',
    school: '',
    gradYear: '',
    jobTitle: '',
    company: '',
    workDates: '',
    skills: ''
};
// Function to show the next step based on the clicked button's `data-next` attribute
function goToNextStep(nextStepId) {
    var currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide current step
    var nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active');
    }
    // Update the currentStep index manually by iterating over formSteps
    formSteps.forEach(function (step, index) {
        if (step.id === nextStepId) {
            currentStep = index;
        }
    });
}
// Attach event listeners to each "Next" button
nextButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var nextStepId = button.getAttribute('data-next');
        if (nextStepId) {
            goToNextStep(nextStepId);
        }
    });
});
// Handle form submission and generate resume preview
submitButton.addEventListener('click', function () {
    var formData = new FormData(document.getElementById('resumeForm'));
    // Collect form data into a ResumeData object
    formData.forEach(function (value, key) {
        resumeData[key] = value;
    });
    // Generate and display the resume preview
    generateResume(resumeData);
});
// Function to generate and display the resume preview
function generateResume(data) {
    var resumeContent = document.getElementById('resumeContent');
    var resumePreview = document.getElementById('resumePreview');
    // Set the "Your Resume" heading to include the user's name
    var resumeHeading = document.getElementById('resumeHeading');
    resumeHeading.innerHTML = "Resume of ".concat(data.fullName);
    // Set the content of the resume preview
    resumeContent.innerHTML = "\n        <div class=\"resume-section\">\n            <h3>Personal Information</h3>\n            <p><strong>Name:</strong> <input type=\"text\" value=\"".concat(data.fullName, "\" id=\"editFullName\"></p>\n            <p><strong>Email:</strong> <input type=\"email\" value=\"").concat(data.email, "\" id=\"editEmail\"></p>\n            <p><strong>Phone:</strong> <input type=\"tel\" value=\"").concat(data.phone, "\" id=\"editPhone\"></p>\n        </div>\n\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            <p><strong>Degree:</strong> <input type=\"text\" value=\"").concat(data.degree, "\" id=\"editDegree\"></p>\n            <p><strong>School:</strong> <input type=\"text\" value=\"").concat(data.school, "\" id=\"editSchool\"></p>\n            <p><strong>Graduation Year:</strong> <input type=\"text\" value=\"").concat(data.gradYear, "\" id=\"editGradYear\"></p>\n        </div>\n\n        <div class=\"resume-section\">\n            <h3>Work Experience</h3>\n            <p><strong>Job Title:</strong> <input type=\"text\" value=\"").concat(data.jobTitle, "\" id=\"editJobTitle\"></p>\n            <p><strong>Company:</strong> <input type=\"text\" value=\"").concat(data.company, "\" id=\"editCompany\"></p>\n            <p><strong>Work Dates:</strong> <input type=\"text\" value=\"").concat(data.workDates, "\" id=\"editWorkDates\"></p>\n        </div>\n\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <p><strong>Skills:</strong> <textarea id=\"editSkills\">").concat(data.skills, "</textarea></p>\n        </div>\n    ");
    // Display the resume preview section
    resumePreview.style.display = 'block';
    // Enable the "Edit Resume" button
    document.getElementById('editResumeButton').style.display = 'inline-block';
}
// Add functionality to allow editing
(_a = document.getElementById('editResumeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var formData = new FormData(document.getElementById('resumeForm'));
    // Collect updated data
    formData.forEach(function (value, key) {
        resumeData[key] = value;
    });
    // Re-generate the resume with updated info
    generateResume(resumeData);
});
