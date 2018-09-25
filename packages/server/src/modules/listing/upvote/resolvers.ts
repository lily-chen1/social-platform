import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { getConnection } from "typeorm";
import { listingCacheKey } from "../../../constants";
// import { isAuthenticated } from "../../shared/isAuthenticated";
import { User } from "../../../entity/User";
import { pull } from "lodash";

// house.png
// aseq2-house.png
// image/png
// image/jpeg
// ['image', 'jpeg']
// 'jpeg'

export const resolvers: ResolverMap = {
  Mutation: {
    upvoteListing: async (
      _,
      {
        listingId,
        upvotes,
        downvotes,
        userId,
        upvoted,
        downvoted,
        voteScenario
      },
      { redis }
    ) => {
      // isAuthenticated(session);
      // 1. user uploads a new picture

      // 2. user remove picture
      // 3. do nothing

      const {
        raw: [newListing]
      } = await getConnection()
        .createQueryBuilder()
        .update(Listing)
        .set({ upvotes, downvotes })
        .where("id = :id", { id: listingId })
        .returning("*")
        .execute();

      const listings = await redis.lrange(listingCacheKey, 0, -1);
      const idx = listings.findIndex(
        (x: string) => JSON.parse(x).id === listingId
      );
      await redis.lset(listingCacheKey, idx, JSON.stringify(newListing));

      const tempUpvoted = upvoted;
      const tempDownvoted = downvoted;
      if (voteScenario === "upvote") {
        tempUpvoted.push(listingId);
      } else if (voteScenario === "deupvote") {
        pull(tempUpvoted, listingId);
      } else if (voteScenario === "downvote") {
        tempDownvoted.push(listingId);
      } else if (voteScenario === "dedownvote") {
        pull(tempDownvoted, listingId);
      } else if (voteScenario === "downvote-while-upvoted") {
        pull(tempUpvoted, listingId);
        tempDownvoted.push(listingId);
      } else if (voteScenario === "upvote-while-downvoted") {
        pull(tempDownvoted, listingId);
        tempUpvoted.push(listingId);
      }

      await User.update(
        { id: userId },
        {
          upvoted: tempUpvoted,
          downvoted: tempDownvoted
        }
      );

      return true;
    }
  }
};
