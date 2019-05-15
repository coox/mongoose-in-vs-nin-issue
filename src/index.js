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
      { tags: [ 'non-empty' ] },
    ]);

    // Expected: Find all documents with “Empty” tags
    const usersWithEmptyTags = await User.find({ tags: { $in: ['', null, []] } });
    // 👍️ Works as expected

    // Expected: Find all documents with “Non-Empty” tags
    const usersWithNonEmptyTags = await User.find({ tags: { $nin: ['', null, []] } });
    // 💥️ MongooseError [CastError]: Cast to string failed for value "[]" at path "tags" for model "User"
  })
  .catch(err => {
    console.error(err);
    throw err;
  });