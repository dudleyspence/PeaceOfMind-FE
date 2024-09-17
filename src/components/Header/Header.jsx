import React from "react";
import logoSmall from "../../assets/Logo/PeaceOfMind_logo_small.png";
import Navbar from "../Nav/navbar";

export default function Header() {
  return (
    <div className="h-16 p-4 box-content flex flex-row-reverse justify-between items-center">
      <img src={logoSmall} alt="small logo" className="h-full" />
      <Navbar />
    </div>
  );
}
