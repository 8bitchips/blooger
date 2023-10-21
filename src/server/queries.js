import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  const posts = await context.entities.Post.findMany();
  return posts;
}

export const getPost = async ({ id }, context) => {
  const post = await context.entities.Post.findUnique({
    where: { id },
    include: { user: true, comments: true }
  });

  if (!post) throw new HttpError(404, 'No post with id ' + id);

  return post;
}

export const getComments = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const postId = args.postId;

  const comments = await context.entities.Comment.findMany({
    where: { postId }
  });

  return comments;
}