import "./accordion.scss";
import { FunctionComponent, ReactElement, ReactNode, useState } from "react";

interface AccordionProps {
  children?: ReactElement;
  className?: string;
  title?: string | ReactNode;
  answer?: string | string[] | number;
  isExpanded: boolean;
  toggleExpanded: () => void;
  isStatusGreen: boolean;
}
const Accordion: FunctionComponent<AccordionProps> = ({
  children,
  title,
  answer,
  isExpanded,
  toggleExpanded,
  isStatusGreen,
}) => {
  return (
    <div className="Accordion">
      <div className={"accordion-item"} onClick={toggleExpanded}>
        <div
          className={`accordion-item-header ${
            isExpanded ? "accordion-expanded" : ""
          }`}>
          <span>{title}</span>
          {!isExpanded && (
            <>
              <span>{answer}</span>
              <span
                className={`status ${
                  isStatusGreen ? "status-green" : ""
                }`}></span>
            </>
          )}
        </div>
      </div>
      <div
        className={`accordion-body ${isExpanded ? "accordion-expanded" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
