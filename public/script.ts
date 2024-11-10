// Type to hold resume data
interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    degree: string;
    school: string;
    gradYear: string;
    jobTitle: string;
    company: string;
    workDates: string;
    skills: string;
}

// Get all the form steps
const formSteps = document.querySelectorAll<HTMLElement>('.form-step');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.nextBtn');
const submitButton = document.getElementById('submitForm') as HTMLButtonElement;

let currentStep = 0;
let resumeData: ResumeData = {
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
function goToNextStep(nextStepId: string): void {
    const currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide current step
    
    const nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active');
    }

    // Update the currentStep index manually by iterating over formSteps
    formSteps.forEach((step, index) => {
        if (step.id === nextStepId) {
            currentStep = index;
        }
    });
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

    // Collect form data into a ResumeData object
    formData.forEach((value, key) => {
        resumeData[key as keyof ResumeData] = value as string;
    });

    // Generate and display the resume preview
    generateResume(resumeData);
});

// Function to generate and display the resume preview
function generateResume(data: ResumeData): void {
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    const resumePreview = document.getElementById('resumePreview') as HTMLDivElement;

    // Set the "Your Resume" heading to include the user's name
    const resumeHeading = document.getElementById('resumeHeading') as HTMLHeadingElement;
    resumeHeading.innerHTML = `Resume of ${data.fullName}`;

    // Set the content of the resume preview
    resumeContent.innerHTML = `
        <div class="resume-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> <input type="text" value="${data.fullName}" id="editFullName"></p>
            <p><strong>Email:</strong> <input type="email" value="${data.email}" id="editEmail"></p>
            <p><strong>Phone:</strong> <input type="tel" value="${data.phone}" id="editPhone"></p>
        </div>

        <div class="resume-section">
            <h3>Education</h3>
            <p><strong>Degree:</strong> <input type="text" value="${data.degree}" id="editDegree"></p>
            <p><strong>School:</strong> <input type="text" value="${data.school}" id="editSchool"></p>
            <p><strong>Graduation Year:</strong> <input type="text" value="${data.gradYear}" id="editGradYear"></p>
        </div>

        <div class="resume-section">
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> <input type="text" value="${data.jobTitle}" id="editJobTitle"></p>
            <p><strong>Company:</strong> <input type="text" value="${data.company}" id="editCompany"></p>
            <p><strong>Work Dates:</strong> <input type="text" value="${data.workDates}" id="editWorkDates"></p>
        </div>

        <div class="resume-section">
            <h3>Skills</h3>
            <p><strong>Skills:</strong> <textarea id="editSkills">${data.skills}</textarea></p>
        </div>
    `;

    // Display the resume preview section
    resumePreview.style.display = 'block';

    // Enable the "Edit Resume" button
    document.getElementById('editResumeButton')!.style.display = 'inline-block';
}

// Add functionality to allow editing
document.getElementById('editResumeButton')?.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('resumeForm') as HTMLFormElement);

    // Collect updated data
    formData.forEach((value, key) => {
        resumeData[key as keyof ResumeData] = value as string;
    });

    // Re-generate the resume with updated info
    generateResume(resumeData);
});
