import styleResolver from "./style-resolver";
import { NextApiHandler } from "next";

/**
 * Next.js api route that resolves a style in a project
 **/
const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    return await styleResolver(req.query as any)
      .then((css) => {
        res.setHeader("Content-Type", "text/css");
        res.setHeader(
          "Cache-Control",
          "private, max-age=86400, stale-while-revalidate=604800"
        );
        res.status(200).end(css);
      })
      .catch((err) => {
        res.status(500).end(err.message);
      });
  } else {
    res.status(404);
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default handler;
