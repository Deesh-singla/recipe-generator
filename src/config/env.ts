
if (!process.env.NEXTAUTH_SECRET) {
    console.log(process.env.NEXTAUTH_SECRET)
    throw new Error("nextAuth secret is not provided");
}

if (process.env.CLIENT_ID == undefined) {
    throw new Error("client id is not provided");
}

if (process.env.CLIENT_SECRET == undefined) {
    throw new Error('CLIENT_SECRET');
}

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export { NEXTAUTH_SECRET, CLIENT_ID, CLIENT_SECRET };