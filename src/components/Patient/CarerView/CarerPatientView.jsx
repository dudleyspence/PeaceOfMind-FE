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

import CarePlan from "../../../assets/patient/CarePlan";
import PatientComments from "../PatientTabs/PatientComments";
import CarerCarePlanPage from "./TodaysCarePage";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatient } from "../../../state/slices/patientSlice";
import {
  selectPatient,
  selectPatientLoading,
  selectPatientError,
} from "../../../state/slices/patientSlice";
import GuardianInfoCard from "./GuardianInfoCard";

export default function CarerPatientView() {
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
          label: "Todays Care",
          value: "care_plan",
          icon: CarePlan,
          desc: (
            <div className="w-full flex flex-col justify-center items-center">
              <CarerCarePlanPage />
            </div>
          ),
        },
        {
          label: "Patient",
          value: "patient",
          icon: UserCircleIcon,
          desc: (
            <div className="p-2 flex flex-col gap-5 rounded-lg">
              <PatientInfoCard />
              <GuardianInfoCard />

              <PatientComments />
            </div>
          ),
        },
        {
          label: "History",
          value: "History",
          icon: Cog6ToothIcon,
          desc: <SelectDate />,
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
    <Tabs value="care_plan">
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
