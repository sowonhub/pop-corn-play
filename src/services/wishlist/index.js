import { databaseAuthClient } from "@/services/database-auth/client";

const TABLE_NAME = "wishlist";

export const wishlistService = {
  async getItems(userId) {
    const { data, error } = await databaseAuthClient
      .from(TABLE_NAME)
      .select("movie")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }
    return (data || []).map((item) => item.movie);
  },

  async addItem(userId, movie) {
    const { error } = await databaseAuthClient.from(TABLE_NAME).insert({
      user_id: userId,
      movie_id: movie.id,
      movie: movie,
    });
    if (error) {
      throw error;
    }
  },

  async removeItem(userId, movieId) {
    const { error } = await databaseAuthClient
      .from(TABLE_NAME)
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);
    if (error) {
      throw error;
    }
  },
};
