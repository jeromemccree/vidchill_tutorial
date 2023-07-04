import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { ErrorMessage, Layout, LoadingMessage } from "~/Components/Components";
import { type NextPage } from "next/types";
import { PlaylistPage } from "~/Components/PlaylistComponent";

const Playlist: NextPage = () => {
  const router = useRouter();
  const { playlistId } = router.query;
  const { data, isLoading, error } = api.playlist.getPlaylistById.useQuery(
    playlistId as string
  );

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (error || !data) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Playlists are avaliable"
          description="Go create some playlists."
        />
      );
    } else {
      return <></>;
    }
  };

  const playlist = data?.playlist;

  return (
    <>
      <Layout>
        {!playlist ? (
          <Error />
        ) : (
          <PlaylistPage
            playlist={{
              id: data.playlist?.id || "",
              title: data.playlist?.title || "",
              description: data.playlist?.description || "",
              videoCount: data.videos.length || 0,
              playlistThumbnail: data.videos[0]?.thumbnailUrl || "",
              createdAt: data.playlist?.createdAt || new Date(),
            }}
            videos={data.videos.map((video) => ({
              id: video?.id || "",
              title: video?.title || "",
              thumbnailUrl: video?.thumbnailUrl || "",
              createdAt: video?.createdAt || new Date(),
              views: video?.views || 0,
            }))}
            authors={data.authors.map((author) => ({
              id: author?.id || "",
              name: author?.name || "",
              image: author?.image || "",
            }))}
            user={{
              id: data.user?.id || "",
              image: data.user?.image || "",
              name: data.user?.name || "",
              followers: data.user?.followers || 0,
            }}
          />
        )}
      </Layout>
    </>
  );
};

export default Playlist;
