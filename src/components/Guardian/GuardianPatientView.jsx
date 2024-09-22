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
import ProgressTab from "../Patient/PatientProgressTab";
import { useParams } from "react-router-dom";
import { getPatientByPatientId } from "../../axios/patient.axios";
import { useState, useEffect } from "react";
import PatientInfoCard from "../Patient/patientInfoCard";
import SelectDate from "../Patient/SelectCareDay";
import CarerInfoCard from "../Patient/PatientCarerInfoCard";
import RepeatingTasksList from "../Patient/PatientCarePlanDesktop";
import PatientCarePlanMobile from "../Patient/PatientCarePlanMobile";
import GuardianPatientSettings from "./GuardianPatientSettings";

export function GuardianPatientView() {
  const { patient_id } = useParams();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [carer, setCarer] = useState(() => {
    if (patient) {
      return patient.carers[0];
    } else {
      setIsLoading(true);
      return null;
    }
  });

  useEffect(() => {
    setIsLoading(true);
    getPatientByPatientId(patient_id).then((patient) => {
      setIsLoading(false);
      setPatient(patient);
      setCarer(patient.carers[0]);
      setData([
        {
          label: patient.name.split(" ")[0],
          value: "profile",
          icon: Square3Stack3DIcon,
          desc: (
            <div className="p-2 flex flex-col gap-5 rounded-lg">
              <PatientInfoCard patient={patient} />
              <ProgressTab />
              <SelectDate />
            </div>
          ),
        },
        {
          label: "Care Plan",
          value: "Care",
          icon: UserCircleIcon,
          desc: (
            <div className="p-2 flex flex-col">
              <CarerInfoCard carer={patient.carers[0]} />
              <PatientCarePlanMobile patient_id={patient_id} />
            </div>
          ),
        },
        {
          label: "Settings",
          value: "settings",
          icon: Cog6ToothIcon,
          desc: <GuardianPatientSettings />,
        },
      ]);
    });
  }, [patient_id]);

  return (
    <Tabs value="profile">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="text-sm">
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-3 h-3" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="p-0 my-5">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
