"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Clock, Youtube } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import podcastsList from "./podcasts.json";

// Helper function to extract YouTube video ID from a URL or return the value if it's already an ID
const extractVideoId = (input) => {
  try {
    const url = new URL(input);
    // If the host is youtube.com, get the "v" query parameter
    if (url.hostname.includes("youtube.com")) {
      return url.searchParams.get("v");
    }
    // If the host is youtu.be, the pathname is the video ID
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1);
    }
  } catch (e) {
    // If parsing fails, assume it's already a video ID
    return input;
  }
  return input;
};

export default function Podcasts() {
  // State to hold the fetched dynamic podcast details.
  const [podcasts, setPodcasts] = useState([]);
  // State for the currently active video (to display in the modal).
  const [activeVideo, setActiveVideo] = useState(null);
  // State to track watched status by podcast id.
  const [watched, setWatched] = useState({});

  useEffect(() => {
    async function fetchPodcastData() {
      // Extract and normalize video IDs from the JSON data
      const videoIds = podcastsList
        .map((item) => extractVideoId(item.youtubeId))
        .join(",");
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`
      );
      const data = await res.json();
      // Map API data to our podcast objects
      const podcastsData = data.items.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        speaker: item.snippet.channelTitle, // using channel title as speaker info
        thumbnail: item.snippet.thumbnails.high.url,
        duration: item.contentDetails.duration, // ISO 8601 duration format
        category: "Podcast",
        views: item.statistics.viewCount,
        youtubeId: item.id,
      }));
      setPodcasts(podcastsData);
    }

    fetchPodcastData();
  }, []);

  // Helper function to format ISO 8601 durations (for production, consider a robust library)
  const formatDuration = (duration) => {
    // For simplicity, return the raw duration string.
    return duration;
  };

  // When a podcast is played, mark it as watched and open the video modal.
  const handlePlay = (podcast) => {
    setActiveVideo(podcast);
    setWatched((prev) => ({ ...prev, [podcast.id]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 p-4 px-12">
      <h1 className="text-3xl font-bold tracking-tight mb-4">This Week's Podcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {podcasts.slice(0, 4).map((podcast) => (
          <Card
            key={podcast.id}
            className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="relative aspect-video">
              <Image
                src={podcast.thumbnail || "/placeholder.svg"}
                alt={podcast.title}
                fill
                className="object-cover"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => handlePlay(podcast)}
                    className="absolute inset-0 w-full h-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    variant="ghost"
                  >
                    <div className="bg-primary/90 rounded-full p-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>{podcast.title}</DialogTitle>
                    <DialogDescription>{podcast.speaker}</DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${podcast.youtubeId}`}
                      title={podcast.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(podcast.duration)}
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base line-clamp-2">{podcast.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 pb-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={podcast.thumbnail} alt={podcast.speaker} />
                  <AvatarFallback>
                    {podcast.speaker.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{podcast.speaker}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Badge variant="outline" className="bg-primary/10 text-xs">
                {podcast.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Youtube className="h-3 w-3" />
                {podcast.views} views
              </div>
            </CardFooter>
            <div className="p-4">
              {watched[podcast.id] ? (
                <Badge variant="solid" className="bg-green-500 text-xs">
                  Watched
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Unwatched
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
