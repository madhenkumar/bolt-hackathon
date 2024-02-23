import { z } from "zod";


export const ProductSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    images: z.string(),
    price: z.number().default(100),
  });

export const CreateProduct = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.string(),
  price: z.string(),
});

export const ServerCreateProductSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.string(),
  price: z.number(),
});

export const CreateFittingPicture = z.object({
  image: z.string(),
})

// export const CreatePost = PostSchema.omit({ id: true });
// export const UpdatePost = PostSchema;
// export const DeletePost = PostSchema.pick({ id: true });

// export const LikeSchema = z.object({
//   postId: z.string(),
// });

// export const BookmarkSchema = z.object({
//   postId: z.string(),
// });

// export const CommentSchema = z.object({
//   id: z.string(),
//   body: z.string(),
//   postId: z.string(),
// });

// export const CreateComment = CommentSchema.omit({ id: true });
// export const UpdateComment = CommentSchema;
// export const DeleteComment = CommentSchema.pick({ id: true });

// export const UserSchema = z.object({
//   id: z.string(),
//   username: z.string().optional(),
//   name: z.string().optional(),
//   image: z.string().optional(),
//   bio: z.string().max(150).optional(),
//   website: z.string().optional(),
//   gender: z.string().optional(),
// });

// export const UpdateUser = UserSchema;
// export const DeleteUser = UserSchema.pick({ id: true });
// export const FollowUser = UserSchema.pick({ id: true });