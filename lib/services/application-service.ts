export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  motivation_letter: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

const STORAGE_KEY = "job_applications";

const getApplications = (): Application[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const applicationService = {
  async createApplication(jobId: string, userId: string, motivationLetter: string): Promise<Application> {
    const applications = getApplications();
    
    const newApplication: Application = {
      id: crypto.randomUUID(),
      job_id: jobId,
      user_id: userId,
      motivation_letter: motivationLetter,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    applications.push(newApplication);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    
    return newApplication;
  },

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    const applications = getApplications();
    return applications.filter(app => app.user_id === userId);
  },

  async getApplicationsByJob(jobId: string): Promise<Application[]> {
    const applications = getApplications();
    return applications.filter(app => app.job_id === jobId);
  },

  async updateApplicationStatus(applicationId: string, status: "accepted" | "rejected"): Promise<Application> {
    const applications = getApplications();
    const index = applications.findIndex(app => app.id === applicationId);
    
    if (index === -1) {
      throw new Error("Application not found");
    }

    applications[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    
    return applications[index];
  }
}; 