import { peaceOfMindAPI } from "./axios";

export const getTaskTemplatesByPatientId = (patient_id) => {
  console.log(patient_id);
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/task-templates`)
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};

export const updateRecurringTask = (task_id, update) => {
  return peaceOfMindAPI
    .patch(`/tasks/templates/${task_id}`, update)
    .then(({ data }) => {
      console.log(data);
    });
};
