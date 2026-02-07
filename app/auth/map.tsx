import type { WizardMap } from "./(contexts)/wizard/WizardContext";
import { DetailsStep } from "./(steps)/details/DetailsStep";
import { RoleStep } from "./(steps)/role/RoleStep";

export const authMap: WizardMap = {
  role: {
    id: "role",
    nodes: ["details"],
    component: <RoleStep />,
  },
  details: {
    id: "details",
    nodes: [],
    component: <DetailsStep />,
  },
};
