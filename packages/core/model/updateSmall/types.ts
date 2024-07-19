import { Lens } from "monocle-ts";
import { Cell, Digit } from "../../interface/types"

export type Payload = {
    lens: Lens<Cell, Digit[]>;
    value: Digit;
  };