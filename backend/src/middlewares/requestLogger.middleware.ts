import { Request, Response, NextFunction } from "express";

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = Math.floor(Math.random() * 1000000).toString();
  const startTime = process.hrtime();

  const logBody =
    req.body && Object.keys(req.body).length
      ? `Body: ${JSON.stringify(req.body)}`
      : "";
  const logQuery =
    req.query && Object.keys(req.query).length
      ? `Query: ${JSON.stringify(req.query)}`
      : "";
  const logParams =
    req.params && Object.keys(req.params).length
      ? `Params: ${JSON.stringify(req.params)}`
      : "";
  const logFile = req.file ? `File: ${req.file.filename}` : "";
  const logArray = [logBody, logQuery, logParams, logFile].filter(
    (log) => log.length > 0
  );

  console.log(
    `[${requestId}] ${req.method} ${req.originalUrl} ${logArray.join(" ")}`
  );

  const logCompletion = () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const milliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    console.log(
      `[${requestId}] ${req.method} ${req.originalUrl} took ${milliseconds}ms`
    );
  };

  res.on("finish", logCompletion);
  res.on("close", logCompletion);

  next();
};

export default requestLoggerMiddleware;
