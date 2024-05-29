import { Resource } from "sst";
export const getRealtimeData = async () => {
  "use server";
  const topic = "chat";
  return {
    endpoint: Resource.MyRealtime.endpoint,
    authorizer: Resource.MyRealtime.authorizer,
    topic: `${Resource.App.name}/${Resource.App.stage}/${topic}`,
  };
};
