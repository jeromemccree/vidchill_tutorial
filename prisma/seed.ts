import {
  type Video,
  type User,
  type VideoEngagement,
  EngagementType,
  type FollowEngagement,
  type Announcement,
  PrismaClient,
  type AnnouncementEngagement,
  type Comment,
  type Playlist,
  type PlaylistHasVideo,
} from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

const usersFile = path.join(__dirname, "data/user.json");
const users: User[] = JSON.parse(fs.readFileSync(usersFile, "utf-8")) as User[];

const videosFile = path.join(__dirname, "data/video.json");
const videos: Video[] = JSON.parse(
  fs.readFileSync(videosFile, "utf-8")
) as Video[];

const videoEngagementsFile = path.join(__dirname, "data/videoEngagement.json");
const videoEngagements: VideoEngagement[] = JSON.parse(
  fs.readFileSync(videoEngagementsFile, "utf-8")
) as VideoEngagement[];

const followEngagementsFile = path.join(
  __dirname,
  "data/followEngagement.json"
);
const followEngagements: FollowEngagement[] = JSON.parse(
  fs.readFileSync(followEngagementsFile, "utf-8")
) as FollowEngagement[];

const announcementsFile = path.join(__dirname, "data/announcement.json");
const announcements: Announcement[] = JSON.parse(
  fs.readFileSync(announcementsFile, "utf-8")
) as Announcement[];

const announcementEngagementsFile = path.join(
  __dirname,
  "data/announcementEngagement.json"
);
const announcementEngagements: AnnouncementEngagement[] = JSON.parse(
  fs.readFileSync(announcementEngagementsFile, "utf-8")
) as AnnouncementEngagement[];

const commentsFile = path.join(__dirname, "data/comment.json");
const comments: Comment[] = JSON.parse(
  fs.readFileSync(commentsFile, "utf-8")
) as Comment[];

const playlistsFile = path.join(__dirname, "data/playlist.json");
const playlists: Playlist[] = JSON.parse(
  fs.readFileSync(playlistsFile, "utf-8")
) as Playlist[];
const playlistHasVideoFile = path.join(__dirname, "data/playlistHasVideo.json");
const playlistHasVideos: PlaylistHasVideo[] = JSON.parse(
  fs.readFileSync(playlistHasVideoFile, "utf-8")
) as PlaylistHasVideo[];
async function processInChunks<T, U>(
  items: T[],
  chunkSize: number,
  processItem: (item: T) => Promise<U>
): Promise<U[]> {
  const results: U[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkPromises = chunk.map(processItem);
    results.push(...(await Promise.all(chunkPromises)));
  }
  return results;
}

async function main() {
  // Delete all records from tables
  await prisma.user.deleteMany();
  await prisma.video.deleteMany();
  // await prisma.videoEngagement.deleteMany();
  // await prisma.playlist.deleteMany();
  // await prisma.playlistHasVideo.deleteMany();
  // await prisma.followEngagement.deleteMany();
  // await prisma.announcement.deleteMany();
  // await prisma.announcementEngagement.deleteMany();
  // await prisma.comment.deleteMany();
  // await processInChunks(videos, 50, (video) =>
  //   prisma.video.upsert({
  //     where: { id: video.id },
  //     update: {
  //       ...video,
  //       createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
  //     },
  //     create: {
  //       ...video,
  //       createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
  //     },
  //   })
  // );
  await processInChunks(users, 50, (user) =>
    prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...user,
        emailVerified: user.emailVerified
          ? new Date(user.emailVerified)
          : undefined,
      },
      create: {
        ...user,
        emailVerified: user.emailVerified
          ? new Date(user.emailVerified)
          : undefined,
      },
    })
  );
  await processInChunks(videos, 50, (video) =>
    prisma.video.upsert({
      where: { id: video.id },
      update: {
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
      },
      create: {
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
      },
    })
  );
  // await processInChunks(videoEngagements, 50, (videoEngagement) =>
  //   prisma.videoEngagement.upsert({
  //     where: { id: videoEngagement.id.toString() },
  //     update: {
  //       ...videoEngagement,
  //       id: videoEngagement.id.toString(),
  //       userId: videoEngagement.userId?.toString(),
  //       videoId: videoEngagement.videoId.toString(),
  //       engagementType:
  //         EngagementType[
  //           videoEngagement.engagementType as keyof typeof EngagementType
  //         ],
  //       createdAt: videoEngagement.createdAt
  //         ? new Date(videoEngagement.createdAt)
  //         : undefined,
  //     },
  //     create: {
  //       ...videoEngagement,
  //       id: videoEngagement.id.toString(),
  //       userId: videoEngagement.userId?.toString(),
  //       videoId: videoEngagement.videoId.toString(),
  //       engagementType:
  //         EngagementType[
  //           videoEngagement.engagementType as keyof typeof EngagementType
  //         ],
  //       createdAt: videoEngagement.createdAt
  //         ? new Date(videoEngagement.createdAt)
  //         : undefined,
  //     },
  //   })
  // );
  // await processInChunks(followEngagements, 1, async (followEngagement) => {
  //   // First try to find an existing followEngagement record with the same followerId and followingId
  //   const existingFollowEngagements = await prisma.followEngagement.findMany({
  //     where: {
  //       followerId: followEngagement.followerId.toString(),
  //       followingId: followEngagement.followingId.toString(),
  //     },
  //   });
  //   if (existingFollowEngagements.length === 0 || !existingFollowEngagements) {
  //     const data = await prisma.followEngagement.create({
  //       data: {
  //         follower: {
  //           connect: { id: followEngagement.followerId.toString() },
  //         },
  //         following: {
  //           connect: { id: followEngagement.followingId.toString() },
  //         },
  //         engagementType: followEngagement.engagementType,
  //         createdAt: followEngagement.createdAt
  //           ? new Date(followEngagement.createdAt)
  //           : undefined,
  //       },
  //     });
  //     return data;
  //   } else if (existingFollowEngagements.length > 1) {
  //     return;
  //   }
  // });
  // await processInChunks(announcements, 50, (announcement) =>
  //   prisma.announcement.upsert({
  //     where: { id: announcement.id.toString() },
  //     update: {
  //       ...announcement,
  //       createdAt: announcement.createdAt
  //         ? new Date(announcement.createdAt)
  //         : undefined,
  //     },
  //     create: {
  //       ...announcement,
  //       createdAt: announcement.createdAt
  //         ? new Date(announcement.createdAt)
  //         : undefined,
  //     },
  //   })
  // );
  // await processInChunks(
  //   announcementEngagements,
  //   1,
  //   async (announcementEngagement) => {
  //     // First try to find an existing announcementEngagement record with the same userId and announcementId
  //     const existingAnnouncementEngagements =
  //       await prisma.announcementEngagement.findMany({
  //         where: {
  //           announcementId: announcementEngagement.announcementId.toString(), // Fixed typo here
  //           userId: announcementEngagement.userId.toString(),
  //         },
  //       });
  //     if (
  //       existingAnnouncementEngagements.length === 0 ||
  //       !existingAnnouncementEngagements
  //     ) {
  //       const data = await prisma.announcementEngagement.create({
  //         data: {
  //           user: {
  //             connect: { id: announcementEngagement.userId.toString() },
  //           },
  //           announcement: {
  //             connect: { id: announcementEngagement.announcementId.toString() }, // And here
  //           },
  //           engagementType: announcementEngagement.engagementType,
  //           createdAt: announcementEngagement.createdAt
  //             ? new Date(announcementEngagement.createdAt)
  //             : undefined,
  //         },
  //       });
  //       return data;
  //     } else if (existingAnnouncementEngagements.length > 1) {
  //       return;
  //     }
  //   }
  // );
  // let currentVideoId = 1;
  // await processInChunks(comments, 1, (comment) =>
  //   prisma.comment
  //     .upsert({
  //       where: { id: comment.id },
  //       update: {
  //         ...comment,
  //         videoId: currentVideoId.toString(),
  //         createdAt: comment.createdAt
  //           ? new Date(comment.createdAt)
  //           : undefined,
  //       },
  //       create: {
  //         ...comment,
  //         videoId: currentVideoId.toString(),
  //         createdAt: comment.createdAt
  //           ? new Date(comment.createdAt)
  //           : undefined,
  //       },
  //     })
  //     .then(() => {
  //       currentVideoId = currentVideoId >= 324 ? 1 : currentVideoId + 1;
  //     })
  // );
  // let currentUserId = 164;
  // await processInChunks(playlists, 1, async (playlist) =>
  //   prisma.playlist
  //     .upsert({
  //       where: { id: playlist.id },
  //       update: {
  //         ...playlist,
  //         userId: currentUserId.toString(),
  //         createdAt: playlist.createdAt
  //           ? new Date(playlist.createdAt)
  //           : undefined,
  //       },
  //       create: {
  //         ...playlist,
  //         userId: currentUserId.toString(),
  //         createdAt: playlist.createdAt
  //           ? new Date(playlist.createdAt)
  //           : undefined,
  //       },
  //     })
  //     .then(() => {
  //       currentUserId = currentUserId >= 200 ? 1 : currentUserId + 1;
  //     })
  // );
  //   await processInChunks(playlistHasVideos, 50, (playlistHasVideo) =>
  //     prisma.playlistHasVideo.upsert({
  //       where: { id: playlistHasVideo.id.toString() },
  //       update: {
  //         id: playlistHasVideo.id.toString(),
  //         playlistId: playlistHasVideo.playlistId.toString(),
  //         videoId: playlistHasVideo.videoId.toString(),
  //       },
  //       create: {
  //         id: playlistHasVideo.id.toString(),
  //         playlistId: playlistHasVideo.playlistId.toString(),
  //         videoId: playlistHasVideo.videoId.toString(),
  //       },
  //     })
  //   );
}

void main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
