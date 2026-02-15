// Jobs JSON Data
const jobsData = {
    "jobs": [
        {
            "id": 1,
            "title": "Security Officer",
            "shortDescription": "Position description: Professional security officer needed for various sites. Must be PSIRA registered with minimum Grade C.",
            "fullDescription": {
                "about": "We are seeking vigilant and professional Security Officers to join our team. You will be responsible for protecting premises, assets, and personnel.",
                "requirements": [
                    "PSIRA Grade C or higher",
                    "Minimum 2 years experience",
                    "Grade 12 / Matric",
                    "Valid ID document",
                    "No criminal record",
                    "First Aid Level 1 (advantageous)"
                ],
                "responsibilities": [
                    "Access control at designated points",
                    "Patrolling premises regularly",
                    "Incident reporting and documentation",
                    "CCTV monitoring when required",
                    "Emergency response"
                ],
                "documents": [
                    "Updated CV",
                    "Certified ID copy",
                    "PSIRA certificate",
                    "Matric certificate",
                    "Proof of address"
                ],
                "experience": "2-5 years in security industry",
                "workingHours": "12-hour shifts, day/night rotation",
                "benefits": [
                    "Competitive salary",
                    "Provident fund",
                    "Uniform provided",
                    "Training opportunities"
                ]
            }
        },
        {
            "id": 2,
            "title": "Janitor",
            "shortDescription": "Position description: Experienced cleaner needed for commercial and industrial sites. Must have attention to detail and reliability.",
            "fullDescription": {
                "about": "We are looking for dedicated Janitors to maintain cleanliness and hygiene at our clients' facilities. You will ensure all areas are clean, sanitized, and presentable.",
                "requirements": [
                    "Grade 10 or higher",
                    "6 months cleaning experience",
                    "Reliable and punctual",
                    "Physically fit",
                    "Knowledge of cleaning chemicals (advantageous)"
                ],
                "responsibilities": [
                    "Sweeping, mopping, and vacuuming floors",
                    "Cleaning restrooms and break rooms",
                    "Emptying trash bins",
                    "Restocking supplies",
                    "Reporting maintenance issues"
                ],
                "documents": [
                    "Updated CV",
                    "Certified ID copy",
                    "Grade 10/12 certificate",
                    "Reference letters"
                ],
                "experience": "0-2 years (training provided)",
                "workingHours": "Monday-Friday, 07:00-16:00",
                "benefits": [
                    "Competitive hourly rate",
                    "Uniform provided",
                    "Transport allowance",
                    "Performance bonus"
                ]
            }
        }
    ]
};

// Load jobs on page load
document.addEventListener('DOMContentLoaded', function () {
    loadJobs();
});

function loadJobs() {
    const container = document.getElementById('jobCardsContainer');
    container.innerHTML = '';

    jobsData.jobs.forEach(job => {
        const jobCard = `
                    <div class="col-md-6">
                        <div class="job-card">
                            <h3 class="job-title">${job.title}</h3>
                            <p class="job-description">${job.shortDescription}</p>
                            <div class="job-actions">
                                <a href="#" class="btn-apply" onclick="applyDirectly(${job.id}, '${job.title}'); return false;">APPLY</a>
                                <a href="#" class="btn-learn-more" onclick="showJobDetails(${job.id}); return false;">learn more</a>
                            </div>
                        </div>
                    </div>
                `;
        container.innerHTML += jobCard;
    });
}

// Show job details in modal
function showJobDetails(jobId) {
    const job = jobsData.jobs.find(j => j.id === jobId);
    if (!job) return;

    document.getElementById('modalJobTitle').textContent = job.title;

    const details = job.fullDescription;
    const modalContent = `
                <div class="job-detail-section">
                    <h5><i class="fas fa-info-circle"></i> About the Role</h5>
                    <p>${details.about}</p>
                </div>
                
                <div class="job-detail-section">
                    <h5><i class="fas fa-check-circle"></i> Requirements</h5>
                    <ul>
                        ${details.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="job-detail-section">
                    <h5><i class="fas fa-tasks"></i> Key Responsibilities</h5>
                    <ul>
                        ${details.responsibilities.map(res => `<li>${res}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="job-detail-section">
                            <h5><i class="fas fa-briefcase"></i> Experience</h5>
                            <p>${details.experience}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="job-detail-section">
                            <h5><i class="fas fa-clock"></i> Working Hours</h5>
                            <p>${details.workingHours}</p>
                        </div>
                    </div>
                </div>
                
                <div class="job-detail-section">
                    <h5><i class="fas fa-file-alt"></i> Required Documents</h5>
                    <ul>
                        ${details.documents.map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="job-detail-section">
                    <h5><i class="fas fa-gift"></i> Benefits</h5>
                    <ul>
                        ${details.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            `;

    document.getElementById('modalJobDetails').innerHTML = modalContent;

    // Set up modal apply button
    document.getElementById('modalApplyBtn').onclick = function () {
        bootstrap.Modal.getInstance(document.getElementById('jobDetailsModal')).hide();
        showApplicationForm(jobId, job.title);
    };

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('jobDetailsModal'));
    modal.show();
}

// Apply directly (skip modal)
function applyDirectly(jobId, jobTitle) {
    showApplicationForm(jobId, jobTitle);
}

// Show application form
function showApplicationForm(jobId, jobTitle) {
    document.getElementById('applicationForm').style.display = 'block';
    document.getElementById('applyingForJobId').value = jobId;
    document.getElementById('applicationJobTitle').querySelector('span').textContent = jobTitle;

    // Scroll to form
    document.getElementById('applicationForm').scrollIntoView({ behavior: 'smooth' });
}

// Handle form submission
document.getElementById('jobApplicationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Here you would typically send the form data to a server
    alert('Application submitted successfully! We will contact you soon.');
    this.reset();
    document.getElementById('applicationForm').style.display = 'none';
});