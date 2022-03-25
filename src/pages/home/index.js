import React from "react";
import KodeForm from "../../components/kodeForm";
import KodeSong from "../../components/kodeSong";
import data from "../../data/data";

export default function Main() {
  return (
    <div>
      <KodeForm />
      <KodeSong />
    </div>
  );
}