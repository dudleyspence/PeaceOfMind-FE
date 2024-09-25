import { peaceOfMindAPI } from "./axios";

export const getTaskTemplatesByPatientId = (patient_id) => {
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/task-templates`)
    .then(({ data }) => {
      return data;
    });
};

export const updateRecurringTask = (task_id, update) => {
  return peaceOfMindAPI
    .patch(`/tasks/templates/${task_id}`, update)
    .then(({ data }) => {});
};

export const getTasksForSpecificDay = (patient_id, isoDate) => {
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/tasks/${isoDate}`)
    .then(({ data }) => {
      return data;
    });
};

export const postTask = (task) => {
  console.log(task);
  return peaceOfMindAPI.post(`/tasks`, task).then(({ data }) => {
    console.log(data);
  });
};
