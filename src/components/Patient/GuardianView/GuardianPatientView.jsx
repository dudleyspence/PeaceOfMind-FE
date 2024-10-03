import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import ProgressTab from "../PatientTabs/PatientProgressTab";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import PatientInfoCard from "../PatientTabs/PatientInfoCard";
import SelectDate from "../PatientTabs/SelectCareDay";
import GuardianPatientSettings from "./SettingsPage/GuardianPatientSettings";
import CarePlan from "../../../assets/patient/CarePlan";
import PatientComments from "./PatientComments";
import CarePlanPage from "./CarePlanPage/CarePlanPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatient } from "../../../state/slices/patientSlice";
import {
  selectPatient,
  selectPatientLoading,
  selectPatientError,
} from "../../../state/slices/patientSlice";

export function GuardianPatientView() {
  const { patient_id } = useParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const patient = useSelector(selectPatient);
  const isLoading = useSelector(selectPatientLoading);
  const error = useSelector(selectPatientError);

  useEffect(() => {
    if (!patient || patient._id !== patient_id) {
      dispatch(fetchPatient(patient_id));
    }
  }, [dispatch, patient, patient_id]);

  useEffect(() => {
    if (patient) {
      setData([
        {
          label: patient.name.split(" ")[0],
          value: "profile",
          icon: UserCircleIcon,
          desc: (
            <div className="p-2 flex flex-col gap-5 rounded-lg">
              <PatientInfoCard />
              <div className="cursor-pointer hover:shadow-lg">
                <ProgressTab />
              </div>
              <PatientComments />
              <SelectDate />
            </div>
          ),
        },
        {
          label: "Care Plan",
          value: "Care",
          icon: CarePlan,
          desc: <CarePlanPage />,
        },
        {
          label: "Settings",
          value: "settings",
          icon: Cog6ToothIcon,
          desc: <GuardianPatientSettings patient={patient} />,
        },
      ]);
    }
  }, [patient, patient_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Tabs value="profile">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="text-base font-bold">
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-4 h-4" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel
            key={value}
            value={value}
            className="p-0 my-5 flex justify-center"
          >
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
