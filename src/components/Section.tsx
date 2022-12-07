import React, { FC, ReactNode } from "react";

type SectionType = {
  title: string;
  children?: ReactNode;
};

const Section: FC<SectionType> = ({ title, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
