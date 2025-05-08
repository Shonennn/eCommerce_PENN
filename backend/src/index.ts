import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

// picture upload
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';

// Initialize Express
const app = express();
const httpServer = http.createServer(app);

// GraphQL setup
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/graphql', cors(), json(), expressMiddleware(server));
  httpServer.listen({ port: 4000, host: '0.0.0.0' }, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

// Picture upload setup
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('image'), (req: Request & { file?: Express.Multer.File }, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl: fileUrl });
});

// Serve uploads
app.use('/uploads', express.static(uploadDir));

// Start server
startServer();
