import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {
  MuliColumnVideo,
  Layout,
  ProfileHeader,
  ErrorMessage,
  LoadingMessage,
} from "~/Components/Components";
import { useSession } from "next-auth/react";
import { Button } from "~/Components/Buttons/Buttons";
import Plus from "~/Components/Icons/Plus";

const ProfileVideos: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { userId } = router.query;
  const { data, isLoading, error } = api.video.getVideosByUserId.useQuery(
    userId as string
  );

  const errorTypes = !data || data.videos?.length === 0 || error;
  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (userId == sessionData?.user.id && errorTypes) {
      return (
        <>
          <ErrorMessage
            message="No Videos Uploaded"
            description="Click to upload new video. You have yet to upload a video."
          >
            <Button
              variant="primary"
              size="2xl"
              href="/profile/edit"
              className="ml-2 flex"
            >
              <Plus className="mr-2 h-5 w-5 shrink-0 stroke-white" />
              New Video
            </Button>
          </ErrorMessage>
        </>
      );
    } else if (errorTypes) {
      return (
        <ErrorMessage
          message="No videos avaliable"
          description="Profile has no videos uploaded."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Layout>
        <>
          <ProfileHeader />
          {errorTypes ? (
            <Error />
          ) : (
            <MuliColumnVideo
              videos={data.videos.map((video) => ({
                id: video?.id || "",
                title: video?.title || "",
                thumbnailUrl: video?.thumbnailUrl || "",
                createdAt: video?.createdAt || new Date(),
                views: video?.views || 0,
              }))}
              users={data.users.map((user) => ({
                name: user?.name || "",
                image: user?.image || "",
              }))}
            />
          )}
        </>
      </Layout>
    </>
  );
};

export default ProfileVideos;
