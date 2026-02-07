"use client";

import { DEFAULT_WIZARD_CONTEXT_PARAMS } from "./WizardContext";
import type { WizardStepId } from "./WizardContext";
import { useWizard } from "./useWizard";

export const WizardStep = () => {
  const { map, activeStepId } = useWizard();
  const isValidStepId = (stepId: unknown): stepId is WizardStepId =>
    Object.keys(map).includes(stepId as string);

  if (!isValidStepId(activeStepId)) {
    return map[DEFAULT_WIZARD_CONTEXT_PARAMS.activeStepId].component;
  }

  return map[activeStepId].component;
};
