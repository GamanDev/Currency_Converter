import React, { FC, ReactNode } from "react";

type SectionType = {
  title: string;
  children?: ReactNode;
};

const Section: FC<SectionType> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Section;
