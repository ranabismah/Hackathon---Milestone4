const formSteps = document.querySelectorAll<HTMLElement>('.form-step');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.nextBtn');
const submitButton = document.getElementById('submitForm') as HTMLButtonElement;
let currentStep = 0;

// Store the form data to update resume
let resumeData: Record<string, string> = {};

// Function to go to the next step in the form
function goToNextStep(nextStepId: string) {
    const currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active');
    
    const nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active');
    }

    // Convert NodeList to Array using Array.prototype.slice.call() for compatibility
    currentStep = Array.prototype.slice.call(formSteps).findIndex(step => step.id === nextStepId);
}

// Attach event listeners to each "Next" button
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextStepId = button.getAttribute('data-next');
        if (nextStepId) {
            goToNextStep(nextStepId);
        }
    });
});

// Handle form submission and generate resume preview
submitButton.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('resumeForm') as HTMLFormElement);
    
    // Collect form data into a JavaScript object
    formData.forEach((value, key) => {
        resumeData[key] = value as string;
    });

    // Generate and display the resume preview
    generateResume(resumeData);
});

// Function to generate and display the resume preview
function generateResume(data: Record<string, string>) {
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    resumeContent.innerHTML = `
        <div class="resume-section" id="personal-info">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> <span class="editable" data-field="fullName">${data.fullName}</span></p>
            <p><strong>Email:</strong> <span class="editable" data-field="email">${data.email}</span></p>
            <p><strong>Phone:</strong> <span class="editable" data-field="phone">${data.phone}</span></p>
        </div>

        <div class="resume-section" id="education">
            <h3>Education</h3>
            <p><strong>Degree:</strong> <span class="editable" data-field="degree">${data.degree}</span></p>
            <p><strong>School:</strong> <span class="editable" data-field="school">${data.school}</span></p>
            <p><strong>Graduation Year:</strong> <span class="editable" data-field="gradYear">${data.gradYear}</span></p>
        </div>

        <div class="resume-section" id="work-experience">
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> <span class="editable" data-field="jobTitle">${data.jobTitle}</span></p>
            <p><strong>Company:</strong> <span class="editable" data-field="company">${data.company}</span></p>
            <p><strong>Work Dates:</strong> <span class="editable" data-field="workDates">${data.workDates}</span></p>
        </div>

        <div class="resume-section" id="skills">
            <h3>Skills</h3>
            <p><strong>Skills:</strong> <span class="editable" data-field="skills">${data.skills}</span></p>
        </div>
    `;

    // Display the resume preview section
    document.getElementById('resumePreview')!.style.display = 'block';

    // Attach click event listeners to the editable fields
    const editableFields = document.querySelectorAll('.editable');
    editableFields.forEach((field) => {
        field.addEventListener('click', editField);
    });
}

// Function to make a field editable
function editField(this: HTMLElement) {
    const fieldName = this.getAttribute('data-field')!;
    const fieldValue = this.innerText;

    // Replace the span with an input element
    const input = document.createElement(fieldName === 'skills' ? 'textarea' : 'input');
    input.value = fieldValue;
    input.classList.add('editable');
    
    // Replace the span with the input
    this.innerHTML = '';
    this.appendChild(input);
    
    input.focus();

    // Save the edited value when the user finishes editing
    input.addEventListener('blur', () => {
        resumeData[fieldName] = input.value;

        // Replace the input with the updated value
        this.innerHTML = input.value;

        // Call to update the resume preview immediately
        generateResume(resumeData);
    });
}


