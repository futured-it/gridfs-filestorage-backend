# GridFS FileStorage Backend
This is a small JavaScript demo project that is a file storage backend. The backend is written using Express.js, everything is stored in MongoDB using GridFS to organize files. Also, different libraries were used here: 

- [UUID / `uuid`](https://www.npmjs.com/package/uuid) - to assign a unique identifier to each file for subsequent access.
- [Mongoose / `mongoose`](https://www.npmjs.com/package/mongoose) - to operate with MongoDB.
- [GridFS Stream / `gridfs-stream`](https://www.npmjs.com/package/gridfs-stream) - to stream files from GridFS.
- [Multer / `multer`](https://www.npmjs.com/package/multer) - to handle files from `multipart/form-data` forms.
- [Multer GridFS Storage / `multer-gridfs-storage`](https://www.npmjs.com/package/multer-gridfs-storage) - to storage files from Multer to GridFS.

## Installation
To run it, you basically need to have Node.js installed. Also, you need to have MongoDB installed on your machine or on remote server (like [MongoDB Atlas](https://www.mongodb.com/atlas)).

- **Add .env parameters.** Go to `src` and copy `.env.template` file, then rename it to `.env`. Open this file and change `MONGODB_URL` parameter to link of your database. Also, you can change `PORT` parameter if the standard port does not suit you.

- **Install libraries and run backend.** To run backend, use this commands in `src` directory:
```bash
$ npm i
$ npm start
```
If you did everything right, go to localhost:2349 (or whatever port you set) in your browser, you should see label Hello!.