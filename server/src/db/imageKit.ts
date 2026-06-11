import ImageKit from "imagekit";
import config from "../config";


var imagekit = new ImageKit({
  publicKey: config.publicKey,
  privateKey: config.privateKey,
  urlEndpoint: config.urlEndpoint,
});

export default imagekit;
