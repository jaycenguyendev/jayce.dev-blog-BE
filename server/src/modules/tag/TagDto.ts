import { Tag } from "@/databases/entities/Tag";

export class ResponseTagDto {
  tags: Array<Partial<Tag>>

  constructor(tags: Array<Partial<Tag>>) {
    this.tags = tags
  }
}

