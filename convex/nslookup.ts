import { action } from "./_generated/server";

export const nslookup = action({
  args: {},
  handler: async (ctx, args) => {
    const response = await fetch(
      "http://nkrahua2.hospedagemdesites.ws/api_php/index.php?domain=nkrahua.com"
    );
    return response.text();
  },
});
