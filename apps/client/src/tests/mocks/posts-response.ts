import type { PostsResponse } from "@packages/openapi";

export const POSTS_RESPONSE: PostsResponse = {
  posts: [
    {
      body: "Nulla mattis risus libero, at euismod justo cursus sed. Quisque nulla nisi, elementum non faucibus at, ultrices nec orci. Duis ac metus imperdiet, mattis lectus sed, varius erat. Nulla sem diam, feugiat imperdiet magna id, sollicitudin mattis enim. Fusce congue consequat mauris ac vestibulum. Mauris efficitur metus at placerat porttitor. Aenean eu lacus augue. Vivamus hendrerit quam augue, eu volutpat nisi porttitor in. Etiam tincidunt massa tempus massa fermentum, in auctor turpis volutpat. Pellentesque hendrerit congue dolor.",
      name: "foo",
      title: "タイトルあああああ",
    },
    {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
      name: "bar",
      title: "タイトルいいいいい",
    },
  ],
};
