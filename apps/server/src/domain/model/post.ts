import { Id } from "./common/id";

export class PostId extends Id {
  constructor(public readonly value: string | null) {
    super(value);
  }

  static createAsNull() {
    return new PostId(null);
  }
}

export class Post {
  constructor(
    public readonly id: PostId,
    public readonly title: string,
    public readonly body: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static createNew(title: string, body: string): Post {
    return new Post(PostId.createAsNull(), title, body, new Date(), new Date());
  }

  update(title: string, body: string): Post {
    return new Post(this.id, title, body, this.createdAt, new Date());
  }
}
