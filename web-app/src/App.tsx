import { FC } from "react";

export const App: FC = () => {
  return (
    <div className={"h-screen w-screen bg-neutral-900"}>
      <h1 className={"text-center text-6xl text-white"} data-testid={"heading"}>
        I have TODO this
      </h1>
    </div>
  );
};
