import React from "react";
import logoSmall from "../../assets/Logo/PeaceOfMind_logo_small.png";
import { SideNavBar } from "./Nav/SideNavBar";

export default function Header() {
  return (
    <div className=" h-16 p-4 box-content flex flex-row-reverse justify-between items-center">
      <img src={logoSmall} alt="small logo" className="h-3/5" />
      <SideNavBar />
    </div>
  );
}
