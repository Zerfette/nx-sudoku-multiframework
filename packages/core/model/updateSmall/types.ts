import { Lens } from "monocle-ts";
import { Cell, Digit, Smalls } from "../../interface/types"

export type Payload = {
    lens: Lens<Cell, Smalls>;
    value: Digit;
  };