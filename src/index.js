const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost:27017/sample-database', { useNewUrlParser: true })
  .then(async () => {
    // Create sample documents
    await User.create([
      // “Empty” tags
      { tags: null },
      { tags: [] },
      { tags: [null] },
      { tags: [''] },

      // “Non-Empty” tags
      { tags: [`tag-{Date.now()}`] },
    ]);

    // 👍️ Matches all documents with “Non-Empty” tags
    const usersWithEmptyTags = await User.find({ tags: { $in: ['', null, []] } });

    // 💥️ MongooseError [CastError]: Cast to string failed for value "[]" at path "tags" for model "User"
    const usersWithNonEmptyTags = await User.find({ tags: { $nin: ['', null, []] } });
  })
  .catch(err => {
    console.error(err);
    throw err;
  });