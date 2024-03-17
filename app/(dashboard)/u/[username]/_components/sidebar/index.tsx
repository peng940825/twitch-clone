import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";
import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
}
