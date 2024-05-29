/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-fun",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      public: true,
    });
    new sst.aws.SolidStart("MyWeb", {
      link: [bucket],
    });
  },
});
