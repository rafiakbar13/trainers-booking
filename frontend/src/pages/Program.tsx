import React from "react";
import Program from "../module/program/Program";
type Props = {};

const ProgramPage = (props: Props) => {
  return (
    <section>
      <div className="py-10 bg-gray-20">
        <Program />
      </div>
    </section>
  );
};

export default ProgramPage;
