export const PlayerVisualizer = ({
  waveformRef
}: {
  waveformRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return <div ref={waveformRef} className="w-full h-[250px]" />;
};
