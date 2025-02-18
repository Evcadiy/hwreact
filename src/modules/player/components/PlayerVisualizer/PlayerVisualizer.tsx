import { memo } from "react";

export const PlayerVisualizer = memo(
  ({
    waveformRef
  }: {
    waveformRef: React.RefObject<HTMLDivElement | null>;
  }) => {
    return <div ref={waveformRef} className="w-full h-[250px]" />;
  }
);
