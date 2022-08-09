const Tag = require('../model/Tag');
const Post = require('../model/Post');

const getTags = async (req, res) => {
  const tags = await Tag.find({}, null, { sort: { followers: 1 } });

  res.status(200).json(tags);
};

const getNumTags = async (req, res) => {
  const tags = await Tag.find({}, null, { sort: { followers: 1 } })
    .limit(3)
    .populate({ path: 'posts', populate: 'author' });

  res.status(200).json(tags);
};

const getTagByName = async (req, res) => {
  const tag = await Tag.findOne({ name: req.params.name }).populate('posts').exec();

  res.status(200).json(tag);
};

const getTagsByPostId = async (req, res) => {
  const tags = await Tag.find({ posts: req.params.postId }, null, { sort: { followers: 1 } });
  if (!tags) res.status(204).json('No tags found');
  res.status(200).json(tags);
};

const createTags = async (tags, post) => {
  tags.forEach(tag => {
    (async () => {
      const postTag = await Tag.findOneAndUpdate(
        { name: tag },
        { $addToSet: { posts: post._id } },
        { upsert: true, new: true }
      );
      await Post.updateOne({ _id: post._id }, { $addToSet: { tags: postTag._id } });
    })();
  });
};

const deleteTags = async (tags, post, isPostDeletion) => {
  for (const [i, tag] of post.tags.entries()) {
    if (isPostDeletion ? tags.includes(tag.name) : !tags.includes(tag.name)) {
      const postTag = await Tag.findOneAndUpdate(
        { _id: post.tags[i]._id },
        { $pull: { posts: post._id } }
      );
      await Post.updateOne({ _id: post._id }, { $pull: { tags: post.tags[i]._id } });
      if (postTag.posts.length === 1) await Tag.deleteOne({ name: tag.name });
    }
  }
};

const updateTags = async (tags, post) => {
  await createTags(tags, post);
  await deleteTags(tags, post, false);
};

module.exports = {
  getTags,
  getNumTags,
  getTagsByPostId,
  getTagByName,
  createTags,
  updateTags,
  deleteTags,
};
