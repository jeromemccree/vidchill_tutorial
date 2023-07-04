import { EngagementType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const announcementRouter = createTRPCRouter({
  getAnnoucementsByUserId: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const annoucementsWithUser = await ctx.prisma.announcement.findMany({
        where: {
          userId: input.id,
        },
        include: {
          user: true,
        },
      });
      const annoucements = annoucementsWithUser.map(
        ({ user, ...annoucement }) => annoucement
      );
      const user = annoucementsWithUser.map(({ user }) => user);
      const annoucementsWithEngagements = await Promise.all(
        annoucements.map(async (annoucement) => {
          const likes = await ctx.prisma.announcementEngagement.count({
            where: {
              announcementId: annoucement.id,
              engagementType: EngagementType.LIKE,
            },
          });
          const dislikes = await ctx.prisma.announcementEngagement.count({
            where: {
              announcementId: annoucement.id,
              engagementType: EngagementType.DISLIKE,
            },
          });

          let viewerHasLiked = false;
          let viewerHasDisliked = false;

          if (input.viewerId && input.viewerId !== "") {
            viewerHasLiked =
              !!(await ctx.prisma.announcementEngagement.findFirst({
                where: {
                  announcementId: annoucement.id,
                  userId: input.viewerId,
                  engagementType: EngagementType.LIKE,
                },
              }));

            viewerHasDisliked =
              !!(await ctx.prisma.announcementEngagement.findFirst({
                where: {
                  announcementId: annoucement.id,
                  userId: input.viewerId,
                  engagementType: EngagementType.DISLIKE,
                },
              }));
          }
          const viewer = {
            hasLiked: viewerHasLiked,
            hasDisliked: viewerHasDisliked,
          };

          return {
            ...annoucement,
            likes,
            dislikes,
            viewer,
          };
        })
      );

      return { annoucements: annoucementsWithEngagements, user };
    }),

  addLikeAnnouncement: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingLike = await ctx.prisma.announcementEngagement.findMany({
        where: {
          announcementId: input.id,
          userId: input.userId,
          engagementType: EngagementType.LIKE,
        },
      });

      const existingDislike = await ctx.prisma.announcementEngagement.findMany({
        where: {
          announcementId: input.id,
          userId: input.userId,
          engagementType: EngagementType.DISLIKE,
        },
      });

      if (existingDislike.length > 0) {
        await ctx.prisma.announcementEngagement.deleteMany({
          where: {
            announcementId: input.id,
            userId: input.userId,
            engagementType: EngagementType.DISLIKE,
          },
        });
      }

      if (existingLike.length > 0) {
        const deleteLike = await ctx.prisma.announcementEngagement.deleteMany({
          where: {
            announcementId: input.id,
            userId: input.userId,
            engagementType: EngagementType.LIKE,
          },
        });
        return deleteLike;
      } else {
        const like = await ctx.prisma.announcementEngagement.create({
          data: {
            announcementId: input.id,
            userId: input.userId,
            engagementType: EngagementType.LIKE,
          },
        });

        return like;
      }
    }),

  addDislikeAnnouncement: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingDislike = await ctx.prisma.announcementEngagement.findMany({
        where: {
          announcementId: input.id,
          userId: input.userId,
          engagementType: EngagementType.DISLIKE,
        },
      });
      const existingLike = await ctx.prisma.announcementEngagement.findMany({
        where: {
          announcementId: input.id,
          userId: input.userId,
          engagementType: EngagementType.LIKE,
        },
      });
      if (existingLike.length > 0) {
        await ctx.prisma.announcementEngagement.deleteMany({
          where: {
            announcementId: input.id,
            userId: input.userId,
            engagementType: EngagementType.LIKE,
          },
        });
      }

      if (existingDislike.length > 0) {
        const deleteDislike =
          await ctx.prisma.announcementEngagement.deleteMany({
            where: {
              announcementId: input.id,
              userId: input.userId,
              engagementType: EngagementType.DISLIKE,
            },
          });
        return deleteDislike;
      } else {
        const Dislike = await ctx.prisma.announcementEngagement.create({
          data: {
            announcementId: input.id,
            userId: input.userId,
            engagementType: EngagementType.DISLIKE,
          },
        });

        return Dislike;
      }
    }),
  addAnnouncement: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        message: z.string().max(200).min(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.announcement.create({
        data: {
          userId: input.userId,
          message: input.message,
        },
      });
    }),
});
