export const audioUtils = {
  loadAudio: async (url: string): Promise<AudioBuffer> => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    const AudioContextConstructor =
      window.AudioContext ||
      (window as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextConstructor) {
      throw new Error("AudioContext is not supported in this browser");
    }

    const audioContext = new AudioContextConstructor();
    return audioContext.decodeAudioData(arrayBuffer);
  },

  getAudioData: async (audioUrl: string): Promise<number[]> => {
    const buffer = await audioUtils.loadAudio(audioUrl);
    return audioUtils.clearData(buffer);
  },

  getAudioDuration: async (audioUrl: string): Promise<number> => {
    const buffer = await audioUtils.loadAudio(audioUrl);
    return buffer.duration;
  },

  clearData: (buffer: AudioBuffer): number[] => {
    const rawData = buffer.getChannelData(0);
    const samples = Math.floor(rawData.length / 500);
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData: number[] = [];

    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i;
      const blockSum = rawData
        .slice(blockStart, blockStart + blockSize)
        .reduce((acc, val) => acc + Math.abs(val), 0);
      filteredData.push(blockSum / blockSize);
    }

    const multiplier = Math.max(...filteredData) ** -1;
    return filteredData.map((n) => n * multiplier);
  }
};
