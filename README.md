# **Peace of Mind Front-End**

**Description**  
The **Peace of Mind** front-end application is designed to streamline communication and task management between carers and guardians for elderly patients. This platform allows guardians to create patient profiles, assign tasks with detailed schedules, and monitor daily progress. Carers can then view and complete these tasks while leaving notes, ensuring real-time updates for the guardians.

This project employs **React** for dynamic UI, **MaterialTailwind UI** components for styling, and a mix of state management approaches, including **Redux** and React's built-in state.

---

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Key Components](#key-components)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**

- **Role-Specific Dashboards**: 
  - Carers can view assigned tasks and complete them with notes.
  - Guardians can manage patients, assign tasks, and track progress.
- **Daily Progress Bar**: View task completion percentages for each patient on a given day.
- **Calendar Inputs**: Select dates for creating tasks or searching for historical care data.
- **Task Management**:
  - Add, edit, or delete tasks using intuitive models.
  - Define schedules (daily, weekly, one-time) for tasks.
- **Historical Data View**: Review completed tasks for any past day.
- **Dynamic User Interface**: Fully responsive UI for seamless navigation across devices.
- **Redux State Management**: Efficiently manage global states for tasks and user data.
- **MaterialTailwind UI**: Smart components for an aesthetically pleasing user experience.

---

## **Technologies Used**

- **Frontend**: React.js
- **Styling**: TailwindCSS, MaterialTailwind UI components
- **State Management**: Redux (combined with standard React state)
- **Routing**: React Router
- **API Integration**: Axios
- **Authentication**: Firebase Auth
- **Hosting**: Railway

---

## **Key Components**

The components are organized into folders based on roles and shared functionality. Here’s an overview of the structure:

### **Component Folder Structure**

1. **`Carer` Folder**:  
   Contains components for carer-specific functionalities:
   - **`CarerDashboard.jsx`**: Displays the dashboard for carers, including assigned patients and their daily tasks.
   - **`CarerPatientList.jsx`**: Lists patients linked to the carer, providing navigation to detailed views.

2. **`Guardian` Folder**:  
   Contains components for guardian-specific functionalities:
   - **`GuardianDashboard.jsx`**: Displays the dashboard for guardians to manage patients and tasks.
   - **`GuardianPatientList.jsx`**: Lists patients linked to the guardian, offering quick navigation.

3. **`Patient` Folder**:  
   The primary folder for patient-related functionality, structured as follows:

   - **`CarerView`**:
     - **`CarerPatientView.jsx`**: A core component for carers to navigate an individual patient's data and tasks.
     - **`CarerViewSchedule.jsx`**: Displays schedules specific to a carer’s assigned tasks.

   - **`GuardianView`**:
     - **`GuardianPatientView.jsx`**: A core component for guardians to view and manage patient details and care plans.
     - **`CarePlanPage.jsx`**: Allows guardians to add or edit patient task routines.

   - **`DayView`**:
     - **`PatientDayView.jsx`**: Displays all tasks for a specific day, with features such as:
       - A **daily progress bar** for task completion.
       - Notes between carers and guardians.
       - Static views for historical days, where tasks cannot be modified.
     - **`CarerCheckbox.jsx`**: Enables carers to mark tasks as complete.
     - **`DayViewPagination.jsx`**: Smooth navigation between different dates.

   - **`PatientTabs`**:
     - Common components shared across both carer and guardian dashboards for patient-related navigation.

---

## **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/dudleyspence/PeaceOfMind-FE.git
    cd PeaceOfMind-FE
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory with the following variable:

    ```plaintext
    REACT_APP_API_URL=https://peaceofmind-api-production.up.railway.app
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    ```

4. **Start the development server**:

    ```bash
    npm start
    ```

---

## **Usage**

1. **Launch the application**: Open your browser and navigate to `http://localhost:3000`.
2. **Log in**: Use your credentials or create a new account through Firebase Auth.
3. **Guardian Tasks**:
   - Create patients and assign task routines.
   - View daily progress and historical data.
4. **Carer Tasks**:
   - View assigned tasks and mark them as complete.
   - Leave notes for guardians on task completion.

---

## **Future Enhancements**

- **Improved Historical Data Visualizations**: Incorporate charts and graphs to better represent task completion trends.

---

## **Contributing**

Contributions are welcome! Feel free to:

1. Fork the repository.
2. Create a feature branch:  
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push the branch:  
   ```bash
   git push origin feature/new-feature
   ```
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## **Related Projects**

<div align="center">
    <a href="https://github.com/dudleyspence/PeaceOfMind-FE" align="left">
        <img align="left" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=PeaceOfMind-FE&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" />
    </a>
    <a href="https://github.com/dudleyspence/PeaceOfMind-API" align="right">
        <img align="right" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=PeaceOfMind-API&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" />
    </a>
</div>

<br /><br /><br /><br /><br /><br /><br />
