import { NextApiHandler } from "next";
/**
 * Next.js api route that resolves a style in a project
 **/
declare const handler: NextApiHandler;
export declare const config: {
    api: {
        bodyParser: boolean;
        externalResolver: boolean;
    };
};
export default handler;
