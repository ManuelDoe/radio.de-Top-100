'use client'
import { FC, useState, useRef } from "react";

interface StreamPlayerProps {
    streamUrl: string;
    stationName: string;
}

const StreamPlayer: FC<StreamPlayerProps> = ({ streamUrl, stationName }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div className="bg-[#50cd32] p-4 rounded-lg h-40 max-lg:my-4">
            <h3 className="text-lg font-semibold mb-2">Jetzt streamen!</h3>
            <audio
                ref={audioRef}
                controls
                className="w-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={streamUrl} type="audio/mpeg"/>
                Ihr Browser unterstützt das Audio-Element nicht.
            </audio>
            {isPlaying && (
                <p className="mt-2 text-sm text-white">Sie hören gerade: {stationName}</p>
            )}
        </div>
    );
};

export default StreamPlayer;
