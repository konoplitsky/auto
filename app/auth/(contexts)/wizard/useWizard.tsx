"use client";

import { useContext } from "react";
import { WizardContext } from "./WizardContext";

export const useWizard = () => useContext(WizardContext);
