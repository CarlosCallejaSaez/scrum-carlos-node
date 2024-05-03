import axios from 'axios';

const JIRA_API_BASE_URL = process.env.JIRA_API_BASE_URL;

export async function getIssuesFromJira(): Promise<any[]> {
  try {
    const response = await axios.get(`${JIRA_API_BASE_URL}/search`, {
      auth: {
        username: 'carloscallejasez@gmail.com',
        password: process.env.JIRA_PWD
      },
      params: {
        jql: 'project = TEST1 AND type = "Story" AND status != Closed',
        maxResults: 10 
      }
    });
    return response.data.issues;
  } catch (error:any) {
    throw new Error(`Error fetching issues from Jira: ${error.message}`);
  }
}
