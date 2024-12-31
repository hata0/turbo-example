import type {
  CreatePostCommand,
  DeleteMultiplePostCommand,
  DeletePostCommand,
  EditPostCommand,
} from "@/application/use-case/post/command";
import { PostId } from "@/domain/model/post";

export class CreatePostHttpCommand implements CreatePostCommand {
  constructor(
    private readonly title: string,
    private readonly body: string,
  ) {}

  getPostTitle(): string {
    return this.title;
  }

  getPostBody(): string {
    return this.body;
  }
}

export class EditPostHttpCommand implements EditPostCommand {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly body: string,
  ) {}

  getPostId(): PostId {
    return new PostId(this.id);
  }

  getPostTitle(): string {
    return this.title;
  }

  getPostBody(): string {
    return this.body;
  }
}

export class DeletePostHttpCommand implements DeletePostCommand {
  constructor(private readonly id: string) {}

  getPostId(): PostId {
    return new PostId(this.id);
  }
}

export class DeleteMultiplePostHttpCommand implements DeleteMultiplePostCommand {
  constructor(private readonly ids: string[]) {}

  getPostIds(): PostId[] {
    return this.ids.map((id) => new PostId(id));
  }
}
