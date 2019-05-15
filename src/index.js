const mongoose = require('mongoose');
const Coll = require('./models/Coll');

mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost:27017/sample-database', { useNewUrlParser: true })
  .then(async () => {
    // Create sample documents
    await Coll.create([
      // “Empty” tags
      { tags: null },
      { tags: [] },
      { tags: [null] },
      { tags: [''] },

      // “Non-Empty” tags
      { tags: [ 'non-empty' ] },
    ]);

    // Expected: Find all documents with “Empty” tags
    const documentsWithEmptyTags = await Coll.find({ tags: { $in: ['', null, []] } });
    // 👍️ Works as expected

    // Expected: Find all documents with “Non-Empty” tags
    const documentsWithNonEmptyTags = await Coll.find({ tags: { $nin: ['', null, []] } });
    // 💥️ MongooseError [CastError]: Cast to string failed for value "[]" at path "tags" for model "User"
  })
  .catch(err => {
    console.error(err);
    throw err;
  });