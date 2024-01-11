import { Lens } from "monocle-ts";
import { Cell, Smalls } from "../../interface/types"

export type Payload = {
    lens: Lens<Cell, Smalls>;
    value: number;
  };