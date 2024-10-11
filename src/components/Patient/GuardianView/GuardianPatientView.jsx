import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import ProgressTab from "../PatientTabs/PatientProgressTab";
import { useParams } from "react-router-dom";
import { getPatientByPatientId } from "../../../axios/patient.axios";
import { useState, useEffect } from "react";
import PatientInfoCard from "../PatientTabs/PatientInfoCard";
import SelectDate from "../PatientTabs/SelectCareDay";
import GuardianPatientSettings from "./SettingsPage/GuardianPatientSettings";
import CarePlan from "../../../assets/patient/CarePlan";
import PatientComments from "./PatientComments";
import CarePlanPage from "./CarePlanPage/CarePlanPage";

export function GuardianPatientView() {
  const { patient_id } = useParams();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getPatientByPatientId(patient_id).then((patient) => {
      setIsLoading(false);
      setPatient(patient);
      setData([
        {
          label: patient.name.split(" ")[0],
          value: "profile",
          icon: UserCircleIcon,
          desc: (
            <div className="p-2 flex flex-col gap-5 rounded-lg">
              <PatientInfoCard patient={patient} />
              <div className="cursor-pointer hover:shadow-lg">
                <ProgressTab patient_id={patient_id} />
              </div>
              <PatientComments patient_id={patient_id} />
              <SelectDate patient_id={patient_id} />
            </div>
          ),
        },
        {
          label: "Care Plan",
          value: "Care",
          icon: CarePlan,
          desc: <CarePlanPage patient={patient} />,
        },
        {
          label: "Settings",
          value: "settings",
          icon: Cog6ToothIcon,
          desc: <GuardianPatientSettings patient={patient} />,
        },
      ]);
    });
  }, [patient_id]);

  return isLoading ? (
    "loading"
  ) : (
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
