import { createTRPCRouter } from "~/server/api/trpc";
import { videoRouter } from "./routers/video";
import { userRouter } from "./routers/user";
import { announcementRouter } from "./routers/annoucement";
import { commentRouter } from "./routers/comment";
import { playlistRouter } from "./routers/playlist";
import { videoEngagementRouter } from "./routers/videoEngagement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  video: videoRouter,
  videoEngagement: videoEngagementRouter,
  announcement: announcementRouter,
  comment: commentRouter,
  playlist: playlistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
