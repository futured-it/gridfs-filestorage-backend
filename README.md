# GridFS FileStorage Backend
This is a small JavaScript demo project that is a file storage backend. The backend is written using Express.js, everything is stored in MongoDB using GridFS to organize files. Also, different libraries were used here: 

- [UUID / `uuid`](https://www.npmjs.com/package/uuid) - to assign a unique identifier to each file for subsequent access.
- [Mongoose / `mongoose`](https://www.npmjs.com/package/mongoose) - to operate with MongoDB.
- [GridFS Stream / `gridfs-stream`](https://www.npmjs.com/package/gridfs-stream) - to stream files from GridFS.
- [Multer / `multer`](https://www.npmjs.com/package/multer) - to handle files from `multipart/form-data` forms.
- [Multer GridFS Storage / `multer-gridfs-storage`](https://www.npmjs.com/package/multer-gridfs-storage) - to storage files from Multer to GridFS.