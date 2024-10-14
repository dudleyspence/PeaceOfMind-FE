import { peaceOfMindAPI } from "./axios";

export const getTaskTemplatesByPatientId = (patient_id) => {
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/task-templates`)
    .then(({ data }) => {
      return data;
    });
};

export const updateTaskTemplate = (task_id, update) => {
  return peaceOfMindAPI
    .patch(`/tasks/templates/${task_id}`, update)
    .then(({ data }) => {});
};

export const updateTaskInsance = (taskinstance_id, updates) => {
  console.log(taskinstance_id);
  return peaceOfMindAPI
    .patch(`/tasks/instances/${taskinstance_id}`, updates)
    .then(({ data }) => {
      console.log(data);
    });
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

export const getScheduledTasks = (patient_id) => {
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/scheduled-tasks`)
    .then(({ data }) => data);
};

export const deleteTaskInstance = (instance_id) => {
  return peaceOfMindAPI
    .delete(`/tasks/instances/${instance_id}`)
    .then(({ data }) => {
      console.log(data);
    });
};

export const deleteTaskTemplate = (template_id) => {
  console.log(template_id);
  return peaceOfMindAPI
    .delete(`/tasks/templates/${template_id}`)
    .then(({ data }) => {
      console.log(data);
    });
};
