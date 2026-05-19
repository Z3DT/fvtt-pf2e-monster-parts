import { createOriginalImbues } from "./original/_imbues";
import { MaterialData } from "../material";
import { createElementalStormImbues } from "./elemental-storm";
import { createStrangeAndUnusualImbues } from "./strange-and-unusual";
import { createStaffRefinement } from "./staff";

export function createDefaultImbues(): MaterialData[] {
    return [
        ...createOriginalImbues(),
        ...createStrangeAndUnusualImbues(),
        ...createElementalStormImbues(),
        createStaffRefinement(),
    ];
}
