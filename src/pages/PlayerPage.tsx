import { PlayerDropZoneContainer } from "../modules/player/components/PlayerDropZone";
import { PlayerVisualizerContainer } from "../modules/player/components/PlayerVisualizer";
import { PlayerAudioProvider } from "../modules/player/context";

const PlayerPage = () => {
  return (
    <PlayerAudioProvider>
      <PlayerDropZoneContainer />
      <PlayerVisualizerContainer />
    </PlayerAudioProvider>
  );
};

export default PlayerPage;
