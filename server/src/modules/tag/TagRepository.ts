import { Tag } from "@/databases/entities/Tag";

class TagRepository {
  async getTags() {
    const tags = Tag.find();
    return tags
  }
}
export default new TagRepository();